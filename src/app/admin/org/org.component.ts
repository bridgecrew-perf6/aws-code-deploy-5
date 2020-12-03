import { Component, OnInit } from '@angular/core';
import { OrgService } from '../../services/org.service';
import { Org } from '../../model/org';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { InternationalizationService } from 'src/app/services/internationalization.service';

@Component({
	selector: 'app-org',
	templateUrl: './org.component.html',
	styleUrls: [ './org.component.css' ]
})
export class OrgComponent implements OnInit {
	constructor(
		private orgService: OrgService,
		private internationalizationService: InternationalizationService,
		private route: ActivatedRoute,
		private router: Router,
		private cd: ChangeDetectorRef
	) {}

	labels: any = this.internationalizationService.englishLabels['org.list'];
	orgData: any = [];
	orgGridData: Org[] = [];
	orgGridCols = [
		{ field: 'orgName', header: this.labels['org.list.grid.column1'], link: true },
		{ field: 'orgEmail', header: this.labels['org.list.grid.column2'], link: false },
		// { field: 'orgCity', header: this.labels['org.list.grid.column3'], link: false },
		{ field: 'orgCountry', header: this.labels['org.list.grid.column4'], link: false },
		{ field: 'orgPhone', header: this.labels['org.list.grid.column5'], link: false },
		{ field: 'orgContactName', header: this.labels['org.list.grid.column6'], link: false },
		{ field: 'orgContactEmail', header: this.labels['org.list.grid.column7'], link: false }
	];
	orgListKey: String = 'id';
	//Current user Related
	usrId: number;
	isSuperAdmin: Boolean = false;

	userObj = {};
	ngOnInit(): void {
		var session = sessionStorage.getItem('userDetails');
		this.userObj = JSON.parse(session);
		// Load default user permissions
		var session = sessionStorage.getItem('userDetails');
		var userObj = JSON.parse(session);
		console.log('user object ', userObj);
		this.usrId = userObj.id;
		this.isSuperAdmin = userObj.usrSuperAdmin;
		// Load the Page labels
		if (userObj.usrLangPref !== 'English') {
			var internationalization = sessionStorage.getItem('internationalization');
			var internationalizationObj = JSON.parse(internationalization);
			this.labels = internationalizationObj['org.list'];
			console.log('lables ', this.labels);
			this.orgGridCols = [
				{ field: 'orgName', header: this.labels['org.list.grid.column1'], link: true },
				{ field: 'orgEmail', header: this.labels['org.list.grid.column2'], link: false },
				// { field: 'orgCity', header: this.labels['org.list.grid.column3'], link: false },
				//{ field: 'orgCountry', header: this.labels['org.list.grid.column4'], link: false },
				{ field: 'orgPhone', header: this.labels['org.list.grid.column5'], link: false },
				{ field: 'orgContactName', header: this.labels['org.list.grid.column6'], link: false },
				{ field: 'orgContactEmail', header: this.labels['org.list.grid.column7'], link: false }
			];
			this.cd.detectChanges();
		}
		// Load Org Grid
		this.orgService.getOrg().subscribe((res) => {
			this.orgData = res;
			let orgData = [];
			for (let index = 0; index < this.orgData.length; index++) {
				let org = new Org();
				org.id = this.orgData[index].id;
				org.orgName = this.orgData[index].orgName;
				org.orgBusinessAddress = this.orgData[index].orgBusinessAddress;
				org.orgCommAddress = this.orgData[index].orgCommAddress;
				org.orgCity = this.orgData[index].orgCity;
				org.orgState = this.orgData[index].orgState;
				org.orgCountry = this.orgData[index].orgCountry;
				org.orgZipcode = this.orgData[index].orgZipcode;
				org.orgPhone = this.orgData[index].orgPhone;
				org.orgAltPhone = this.orgData[index].orgAltPhone;
				org.orgEmail = this.orgData[index].orgEmail;
				org.orgContactName = this.orgData[index].orgContactName;
				org.orgContactPhone = this.orgData[index].orgContactPhone;
				org.orgContactEmail = this.orgData[index].orgContactEmail;
				org.orgBuildVersion = this.orgData[index].orgBuildVersion;
				org.orgLangPref = this.orgData[index].orgLangPref;
				org.orgTimeZone = this.orgData[index].orgTimeZone;
				org.org2fa = this.orgData[index].org2fa;
				org.orgMode = this.orgData[index].orgMode;
				orgData.push(org);
			}
			this.orgGridData = orgData;
			//this.cd.detectChanges();
		});
	}
	selectionChanged(data: any) {
		var orgId = data.id;
		this.router.navigate([ '/admin/org-detail/' + orgId ]);
	}

	public hasPermission(key: String) {
		// if(this.userObj["usrSuperAdmin"] == true)
		//   return true;
		if (this.userObj['permissions'].indexOf(key) > -1) {
			return true;
		} else return false;
	}
}
