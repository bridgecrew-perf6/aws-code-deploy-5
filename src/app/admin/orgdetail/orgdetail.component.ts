import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';
import { OrgService } from 'src/app/services/org.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Org } from 'src/app/model/org';
import { TimezoneService } from 'src/app/services/timezone.service';
import { state } from '@angular/animations';
import { environment } from '../../../environments/environment';
import { InternationalizationService } from 'src/app/services/internationalization.service';

@Component({
	selector: 'app-orgdetail',
	templateUrl: './orgdetail.component.html',
	styleUrls: [ './orgdetail.component.css' ]
})
export class OrgdetailComponent implements OnInit {
	constructor(
		private formBuilder: FormBuilder,
		private countryService: CountryService,
		private timezoneService: TimezoneService,
		private orgService: OrgService,
		private internationalizationService: InternationalizationService,
		private route: ActivatedRoute,
		private router: Router,
		private cd: ChangeDetectorRef
	) {}

	id: number;

	registerForm: FormGroup;
	submitted = false;
	masterComponents: any = [];
	existingOrgDetails: any;
	org: Org;
	countries: String[] = [];
	timezone: any[] = [];

	componentGridDataKey: String = 'id';
	componentGridRowSelection: boolean = true;
	componentGridColumns: any[] = [];
	selectedComponents: any[] = [];
	selectedComponentsTemp: any[] = [];

	responseObject: any = {};
	intLabels: any = this.internationalizationService.englishLabels['org.details'];

	labels: any = {
		title: this.intLabels['org.details.main.heading.add'],
		button: this.intLabels['org.details.main.button.save'],
		activeButton: this.intLabels['org.details.main.button.deactivate']
	};

	toggleSaveButton: boolean = false;

	orgActive: boolean = true;
	userObj = {};

	ngOnInit(): void {
		// Load Logged in user
		var session = sessionStorage.getItem('userDetails');
		this.userObj = JSON.parse(session);
		//Load Page Lables
		if (this.userObj['usrLangPref'] !== 'English') {
			var internationalization = sessionStorage.getItem('internationalization');
			var internationalizationObj = JSON.parse(internationalization);
			this.intLabels = internationalizationObj['org.details'];
		}
		// Create form
		console.log('at start ', this.selectedComponents);
		this.labels.title = this.intLabels['org.details.main.heading.add'];
		this.labels.button = this.intLabels['org.details.main.button.save'];
		this.labels.activeButton = this.intLabels['org.details.main.button.deactivate'];
		this.org = new Org();
		this.org.orgLangPref = 'English';
		this.org.org2fa = false;
		this.org.orgMode = 'paid';
		this.countries = this.countryService.getCountryNamesArray();
		this.timezone = this.timezoneService.getTimezoneArray();
		console.log('Timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
		this.timezone.find((zone) => {
			if (zone.timezone == Intl.DateTimeFormat().resolvedOptions().timeZone) {
				this.org.orgTimeZone = zone.name;
			}
		});
		//this.registerForm.controls['orgTimeZone'].setValue(this.org.orgTimeZone);
		console.log('after setting ', this.org.orgTimeZone);
		this.registerForm = this.formBuilder.group({
			orgName: [ this.org.orgName, Validators.required ],
			orgLangPref: [ this.org.orgLangPref, Validators.required ],
			orgBusinessAddress: [ this.org.orgBusinessAddress, [ Validators.required, Validators.maxLength(1000) ] ],
			orgCommAddress: [ this.org.orgCommAddress, [ Validators.maxLength(1000) ] ],
			orgCountry: [ this.org.orgCountry, [ Validators.required ] ],
			orgState: this.org.orgState,
			orgCity: [ this.org.orgCity, [ Validators.required ] ],
			orgZipcode: this.org.orgZipcode,
			orgPhone: [ this.org.orgPhone, [ Validators.required ] ],
			orgAltPhone: this.org.orgAltPhone,
			orgEmail: [ this.org.orgEmail, [ Validators.required, Validators.email ] ],
			orgTimeZone: [ 'Asia/Kolkata', [ Validators.required ] ],
			orgBuildVersion: [ { value: environment.buildVersion, disabled: true }, [ Validators.required ] ],
			orgMode: [ this.org.orgMode, [ Validators.required ] ],
			org2fa: [ this.org.org2fa, [ Validators.required ] ],
			org2fasms: this.org.org2fasms,
			org2faemail: this.org.org2faemail,
			orgContactName: [ this.org.orgContactName, [ Validators.required ] ],
			orgContactPhone: [ this.org.orgContactPhone, [ Validators.required ] ],
			orgContactEmail: [ this.org.orgContactEmail, [ Validators.required, Validators.email ] ]
		});
		this.orgActive = true;

		// Getting the orgId from the route
		// If orgId == 0 then new org creation if orgId > 0 then orgUpdation
		this.id = this.route.snapshot.params['id'];
		this.orgService.getComponents().subscribe((res) => {
			this.masterComponents = res;
			this.cd.detectChanges();
			//console.log(this.masterComponents);
			this.componentGridColumns = [
				{ field: 'compName', header: 'Components', link: false },
				{ field: 'compType', header: 'Type', link: false }
			];

			if (this.id > 0) {
				// Changing the labels
				this.labels.title = this.intLabels['org.details.main.heading.update'];
				this.labels.button = this.intLabels['org.details.main.button.update'];
				// Getting the existing orgDtails
				this.orgService.getOrgdetails(this.id).subscribe((res) => {
					this.existingOrgDetails = res;
					console.log(this.existingOrgDetails);
					let selectedComp = [];
					let masterArray = [];
					masterArray = this.masterComponents;
					selectedComp = this.existingOrgDetails.fzOrgComponentDtos;
					selectedComp.forEach((comp) => {
						masterArray.forEach((masterComp) => {
							if (comp.compKey == masterComp.compKey) {
								this.selectedComponentsTemp.push(masterComp);
							}
						});
					});
					this.selectedComponents = this.selectedComponentsTemp;

					console.log('auto selected comps : ', this.selectedComponents);
					console.log(this.selectedComponents);
					//Putting the data from api in the form
					this.org = this.mapExistingOrgData();
					this.registerForm.controls['orgName'].setValue(this.org.orgName);
					this.registerForm.controls['orgLangPref'].setValue(this.org.orgLangPref);
					this.registerForm.controls['orgBusinessAddress'].setValue(this.org.orgBusinessAddress);
					this.registerForm.controls['orgCommAddress'].setValue(this.org.orgCommAddress);
					this.registerForm.controls['orgCountry'].setValue(this.org.orgCountry);
					this.registerForm.controls['orgState'].setValue(this.org.orgState);
					this.registerForm.controls['orgCity'].setValue(this.org.orgCity);
					this.registerForm.controls['orgZipcode'].setValue(this.org.orgZipcode);
					this.registerForm.controls['orgPhone'].setValue(this.org.orgPhone);
					this.registerForm.controls['orgAltPhone'].setValue(this.org.orgAltPhone);
					this.registerForm.controls['orgEmail'].setValue(this.org.orgEmail);
					this.registerForm.controls['orgTimeZone'].setValue(this.org.orgTimeZone);
					this.registerForm.controls['orgBuildVersion'].setValue(this.org.orgBuildVersion);
					this.registerForm.controls['orgMode'].setValue(this.org.orgMode);
					this.registerForm.controls['org2fa'].setValue(this.org.org2fa);
					this.registerForm.controls['org2fasms'].setValue(this.org.org2fasms);
					this.registerForm.controls['org2faemail'].setValue(this.org.org2faemail);
					this.registerForm.controls['orgContactName'].setValue(this.org.orgContactName);
					this.registerForm.controls['orgContactPhone'].setValue(this.org.orgContactPhone);
					this.registerForm.controls['orgContactEmail'].setValue(this.org.orgContactEmail);

					// Changing the labels
					console.log('Org status ', this.org.orgStatus);
					if (this.org.orgStatus) {
						this.orgActive = this.org.orgStatus;
						this.labels.activeButton = this.intLabels['org.details.main.button.deactivate'];
					} else {
						this.orgActive = this.org.orgStatus;
						this.labels.activeButton = this.intLabels['org.details.main.button.activate'];
					}
				});

				console.log('Update form ', this.registerForm);
			} else {
				let masterArray = [];
				masterArray = this.masterComponents;
				masterArray.forEach((comp) => {
					if (comp.compType === 'default') {
						this.selectedComponentsTemp.push(comp);
					}
				});
				this.selectedComponents = this.selectedComponentsTemp;
				console.log('Add selected component ', this.selectedComponents);
			}
		});
	}

	mapExistingOrgData() {
		let org = new Org();
		org.id = this.existingOrgDetails.id;
		org.orgName = this.existingOrgDetails.orgName;
		org.orgBusinessAddress = this.existingOrgDetails.orgBusinessAddress;
		org.orgCommAddress = this.existingOrgDetails.orgCommAddress;
		org.orgCity = this.existingOrgDetails.orgCity;
		org.orgState = this.existingOrgDetails.orgState;
		org.orgCountry = this.existingOrgDetails.orgCountry;
		org.orgZipcode = this.existingOrgDetails.orgZipcode;
		org.orgPhone = this.existingOrgDetails.orgPhone;
		org.orgAltPhone = this.existingOrgDetails.orgAltPhone;
		org.orgEmail = this.existingOrgDetails.orgEmail;
		org.orgContactName = this.existingOrgDetails.orgContactName;
		org.orgContactPhone = this.existingOrgDetails.orgContactPhone;
		org.orgContactEmail = this.existingOrgDetails.orgContactEmail;
		org.orgBuildVersion = this.existingOrgDetails.orgBuildVersion;
		org.orgLangPref = this.existingOrgDetails.orgLangPref;
		org.orgTimeZone = this.existingOrgDetails.orgTimeZone;
		org.org2fa = this.existingOrgDetails.org2fa;
		org.org2faemail = this.existingOrgDetails.org2faemail;
		org.org2fasms = this.existingOrgDetails.org2fasms;
		org.orgMode = this.existingOrgDetails.orgMode;
		org.orgStatus = this.existingOrgDetails.orgStatus;
		return org;
	}

	selectComponent(data: any) {
		this.selectedComponents = data;
		console.log(this.selectedComponents);
	}

	onSubmit() {
		this.submitted = true;
		// stop the process here if form is invalid
		if (this.registerForm.invalid) {
			return;
		}
		let orgSavePayload = this.registerForm.value;
		let components = [];
		this.selectedComponents.forEach((component) => {
			let compObj = {
				compName: component.compName,
				compKey: component.compKey,
				compMode: component.compMode,
				compType: component.compType
			};
			components.push(compObj);
		});
		orgSavePayload['fzOrgComponentDtos'] = components;
		console.log(orgSavePayload);
		if (this.id > 0) {
			//update org
			orgSavePayload['id'] = this.id;
			this.orgService.updateOrg(orgSavePayload).subscribe((res) => {
				console.log(res);
				this.responseObject = res;
				alert(this.responseObject.message);
				this.router.navigate([ '/admin/org' ]);
			});
		} else {
			//create org
			this.orgService.saveOrg(orgSavePayload).subscribe((res) => {
				console.log(res);
				this.responseObject = res;
				this.id = this.responseObject.id;
				alert(this.responseObject.message);
				this.router.navigate([ '/admin/org' ]);
			});
		}
	}

	activateDeactivateOrg() {
		if (this.id > 0) {
			// existing org
			let state;
			if (this.labels.activeButton == this.intLabels['org.details.main.button.activate']) {
				state = true;
			} else {
				state = false;
			}
			if (this.id == 1) {
				alert('You cant activate deactivate Super Org');
			} else {
				this.orgService.activateDeactivateOrg(this.id, state).subscribe((res) => {
					this.responseObject = res;
					console.log(res);
					alert(this.responseObject.message);
				});
			}
		} else {
			// new org
		}
	}

	public hasPermission(key: String) {
		// if(this.userObj["usrSuperAdmin"] == true)
		//   return true;
		if (this.userObj['permissions'].indexOf(key) > -1) {
			return true;
		} else return false;
	}
}
