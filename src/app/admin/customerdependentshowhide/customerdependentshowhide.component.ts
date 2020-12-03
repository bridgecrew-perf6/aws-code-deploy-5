import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import { DependentDisplayConfig } from 'src/app/model/dependentdisplayconfig';
import { DependentshowhideService } from 'src/app/services/dependentshowhide.service';
import { DependentdataComponent } from '../dependentdata/dependentdata.component';

@Component({
	selector: 'app-customerdependentshowhide',
	templateUrl: './customerdependentshowhide.component.html',
	styleUrls: [ './customerdependentshowhide.component.css' ]
})
export class CustomerdependentshowhideComponent implements OnInit {
	constructor(
		private cd: ChangeDetectorRef,
		private formBuilder: FormBuilder,
		private dependentshowhideService: DependentshowhideService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	labels: any = {
		title: 'Customer Dependent Show/Hide Config',
		parentAttribute: 'Parent Attribute',
		parentValue: 'Parent Value',
		childAttribute: 'Child Attribute',
		display: 'Display',
		button1: 'Save'
	};
	customerAttributes: any = [];

	dependentdisplayConfig: DependentDisplayConfig;
	//form
	customerDependentForm: FormGroup;
	submitted: boolean = false;
	id: number;

	responseObject: any = {};
	existingdependentDisplay: any = {};

	ngOnInit(): void {
		this.dependentdisplayConfig = new DependentDisplayConfig();
		console.log('before form --->', this.dependentdisplayConfig.ddcParentAttrb);
		this.customerDependentForm = this.formBuilder.group({
			ddcParentAttrb: [ this.dependentdisplayConfig.ddcParentAttrb, Validators.required ],
			ddcChildAttrb: [ this.dependentdisplayConfig.ddcChildAttrb, Validators.required ],
			ddcParentValue: [ this.dependentdisplayConfig.ddcParentValue, Validators.required ],
			ddcDisplay: [ this.dependentdisplayConfig.ddcDisplay, Validators.required ]
		});
		this.dependentshowhideService.getCustomerLabels().subscribe((res) => {
			let customerLabels = [];
			customerLabels = [ res ];
			customerLabels.sort(
				(a, b) => (a.occDisplayOrder > b.occDisplayOrder ? 1 : b.occDisplayOrder > a.occDisplayOrder ? -1 : 0)
			);
			this.customerAttributes = res;
		});
		

		// If id > 0 then update
		this.id = this.route.snapshot.params['id'];
		if (this.id > 0) {
			this.dependentshowhideService.getDependentDisplay(this.id).subscribe((res) => {
				this.existingdependentDisplay = res;

				this.customerDependentForm.controls['ddcParentAttrb'].setValue(
					this.existingdependentDisplay['ddcParentAttrb']
				);
				this.customerDependentForm.controls['ddcChildAttrb'].setValue(
					this.existingdependentDisplay['ddcChildAttrb']
				);
				this.customerDependentForm.controls['ddcParentValue'].setValue(
					this.existingdependentDisplay['ddcParentValue']
				);
				this.customerDependentForm.controls['ddcDisplay'].setValue(this.existingdependentDisplay['ddcDisplay']);
			});
		}
	}

	onSubmit() {
		this.submitted = true;
		// stop the process here if form is invalid
		if (this.customerDependentForm.invalid) {
			return;
		}

		let parentAttributeId;
		let childAttributeId;
		// looping though the customer custom attributes
		this.customerAttributes.forEach((element) => {
			console.log('----> name ', this.customerDependentForm.value['ddcParentAttrb']);
			if (element['occName'] == this.customerDependentForm.value['ddcParentAttrb']) {
				parentAttributeId = element['id'];
			} else if (element['occName'] == this.customerDependentForm.value['ddcChildAttrb']) {
				childAttributeId = element['id'];
			}
		});
		// Form the payload
		let payload = {};
		payload['ddcModule'] = 'CUSTOMER';
		payload['ddcParentAttrbId'] = parentAttributeId;
		payload['ddcChildAttrbId'] = childAttributeId;
		payload['ddcParentValue'] = this.customerDependentForm.value['ddcParentValue'];
		payload['ddcDisplay'] = this.customerDependentForm.value['ddcDisplay'];
		console.log('Final Payload ', payload);
		if (this.id > 0) {
			// update
			payload['id'] = this.id;
			this.dependentshowhideService.updateCustomerLabels(payload).subscribe((res) => {
				console.log(res);
				this.responseObject = res;
				this.id = this.responseObject.id;
				alert(this.responseObject.message);
				this.router.navigate([ '/admin/dependent-show-hide' ]);
			});
		} else {
			// save
			this.dependentshowhideService.saveCustomerLabels(payload).subscribe((res) => {
				console.log(res);
				this.responseObject = res;
				this.id = this.responseObject.id;
				alert(this.responseObject.message);
				this.router.navigate([ '/admin/dependent-show-hide' ]);
			});
		}
	}
}
