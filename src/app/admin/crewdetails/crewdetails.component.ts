import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { User } from 'src/app/model/user';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';
import { UserserviceService } from 'src/app/userservice.service';
import { CrewUser } from 'src/app/model/crewUser';
import { ActivatedRoute, Router } from '@angular/router';
import { CrewService } from 'src/app/services/crew.service';
import { BusinessProcessService } from 'src/app/services/business-process.service';

@Component({
	selector: 'app-crewdetails',
	templateUrl: './crewdetails.component.html',
	styleUrls: [ './crewdetails.component.css' ]
})
export class CrewdetailsComponent implements OnInit {
	workLocations: any = [];
	bpNames: any = [];
	usersData: any = [];
	users: any = [];
	usersRef: any = [];
	responseCrewObj:any={};
	responseCrewUserObj:any =[];

	constructor(
		private formBuilder: FormBuilder,
		private locationService: LocationService,
		private businessProcessService:BusinessProcessService,
		private userservice: UserService,
		private router: Router,
		private route: ActivatedRoute,
		private cd: ChangeDetectorRef,
		private crewService: CrewService
	) {}

	crewdetailsForm = this.formBuilder.group({
		crewName: [ '' ],
		bpName: [ '' ],
		workLocation: [ '' ]
	});
	heading={
		title:"Crew Config",
		button:"Save"
	  };

	crewDetailsColumns = [
		{ field: 'slNo', header: 'Sl.No', link: false },
		{ field: 'userName', header: 'User', link: false },
		{ field: 'type', header: 'Type', link: false }
	];

	crewsDetails: any = [];
	id: number;
	user: any;
	type: any;
	serailFlag: number = 0;
	responseObject: any;
	ngOnInit(): void {

		// If orgId == 0 then new org creation if orgId > 0 then orgUpdation
		this.id = this.route.snapshot.params['id'];
		
		//Populating location dropdown
		this.locationService.getLocation().subscribe((res) => {
			this.workLocations = res;
			console.log(this.workLocations);
		});
		//	getBusinessProcessByOrg()
		this.businessProcessService.getBusinessProcessByOrg().subscribe((res) => {
			this.bpNames = res;
			console.log(this.bpNames);
			console.log("BP",res,this.bpNames);
		});


		// populating user dropdown   
		this.userservice.getUserDetails().subscribe((response) => {
			this.usersData = response;
			console.log(this.usersData);
			let user;
			console.log('Users Data' + this.usersData);
			for (var i = 0; i < this.usersData.length; i++) {
				console.log('User created' + this.usersData[i].created);
				user = new User();
				user.id = this.usersData[i].id;
				user.slNo = i + 1;
				user.name = this.usersData[i].name;
				user.role = this.usersData[i].role;
				this.usersRef.push(user);
			}
			this.users = this.usersRef;
			this.cd.detectChanges();
		});

		
		if (this.id > 0) {
			this.heading.title = "Update Crew Config" ;
			this.heading.button = "Update";
			this.crewService.getCrewDetails(this.id).subscribe(res => {
				this.responseCrewObj = res;
				console.log("getbyid",this.responseCrewObj);
				this.crewdetailsForm.controls['crewName'].setValue(this.responseCrewObj.crewName);
				this.crewdetailsForm.controls['bpName'].setValue(this.responseCrewObj.bpName);
				this.crewdetailsForm.controls['workLocation'].setValue(this.responseCrewObj.workLocationId);
				this.responseCrewUserObj = this.responseCrewObj.fzCrewUsers;
				var i=1;
                this.responseCrewUserObj.forEach(element => {
					
					let islead = "Subordinate";
					if (element.lead == true) {
						islead = "Lead";
					}
					let userObj = {slNo: i,id: element.userId, userName: element.userName, type: islead};
					this.crewsDetails.push(userObj);
					i++;
				});
					
			});
		}
	}

	userSave() {
		console.log(this.user, ' ', this.type);
		let userObj = { slNo: this.serailFlag + 1, id: this.user.id, userName: this.user.name, type: this.type };
		this.crewsDetails.push(userObj);
		this.user = null;
		this.type = null;
		this.serailFlag = this.serailFlag + 1;
	}

	onSubmit() {
		console.log(this.crewdetailsForm.value);
		console.log(this.crewsDetails)
		if (this.crewsDetails.length <= 0) {
			alert("Please assign Users to Crew");
			return;
		}
		let payload = {
			crewName: this.crewdetailsForm.value['crewName'],
			// workLocationName: this.crewdetailsForm.value['workLocation'].name,
			workLocationId: this.crewdetailsForm.value['workLocation'], 
			bpName: this.crewdetailsForm.value['bpName'],
			bpId: this.crewdetailsForm.value['bpName'],
		}; 
		let crewUsers = [];
		this.crewsDetails.forEach(element => {
			let islead = false;
			if (element.type == "Lead") {
				islead = true
			}
			let userObj = {userId: element.id, userName: element.userName, lead: islead};
			crewUsers.push(userObj);
		});
		payload["fzCrewUsers"] = crewUsers;
		console.log("payload", payload);
		if (this.id > 0) {
			// Update existing crew
			payload["id"] = this.id;
			this.crewService.updateCrew(payload).subscribe(res => {
				this.responseObject = res;
				this.id = this.responseObject.id;
				alert(this.responseObject.message);
				this.router.navigate([ '/admin/crew' ]);
			});
		
		} else {
			console.log("savePayload",payload);
			// Create new crew
			this.crewService.saveCrew(payload).subscribe(res => {
				this.responseObject = res;
				this.id = this.responseObject.id;
				alert(this.responseObject.message);
				this.router.navigate([ '/admin/crew' ]);
			});
		}
	}
}
