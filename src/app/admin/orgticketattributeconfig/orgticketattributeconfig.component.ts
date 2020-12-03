import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgTicketCustomConfig } from 'src/app/model/OrgTicketCustomConfig';
import { TicketcustomconfigService } from 'src/app/services/ticketcustomconfig.service';
import { OrgticketcustomconfigComponent } from '../orgticketcustomconfig/orgticketcustomconfig.component';

@Component({
	selector: 'app-orgticketattributeconfig',
	templateUrl: './orgticketattributeconfig.component.html',
	styleUrls: ['./orgticketattributeconfig.component.css']
})
export class OrgticketattributeconfigComponent implements OnInit {

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private ticketcustomconfigService: TicketcustomconfigService) { }
	id: number;
	bpId: number;
	labels = { title: 'Ticket Custom Attribute Config', button: 'Save' };
	customAttributeForm: FormGroup;
	submitted: boolean = false;
	orgTicketCustomConfig: OrgTicketCustomConfig;
	order: any = [
		1, 2, 3, 4, 5,
		6, 7, 8, 9, 10,
		11, 12, 13, 14, 15,
		16, 17, 18, 19, 20,
		21, 22, 23, 24, 25,
		26, 27, 28, 29, 30,
		31, 32, 33, 34, 35,
		36, 37, 38, 39, 40,
		41, 42, 43, 44, 45,
		46, 47, 48, 49, 50,
		51, 52, 53, 54, 55,
		56, 57, 58, 59, 60,
		61, 62, 63, 64, 65,
		66, 67, 68, 69, 70
	];
	displayTypeOptions = ['Alphanumeric', 'Numeric', 'Select', 'Multi Select', 'Date', 'Date Time', 'Check Box'];
	responseObject: any;

	ngOnInit(): void {
		this.orgTicketCustomConfig = new OrgTicketCustomConfig();

		this.customAttributeForm = this.formBuilder.group({
			otcName: [this.orgTicketCustomConfig.otcName, Validators.required],
			status: [this.orgTicketCustomConfig.status, Validators.required],
			otcFieldType: [{ value: this.orgTicketCustomConfig.otcFieldType, disabled: true }, Validators.required],
			otcIntegrationLabel: [this.orgTicketCustomConfig.otcIntegrationLabel],
			otcMinLength: [this.orgTicketCustomConfig.otcMinLength],
			otcMaxLength: [this.orgTicketCustomConfig.otcMaxLength],
			otcToolTip: [this.orgTicketCustomConfig.otcToolTip],
			otcDefaultValue: [this.orgTicketCustomConfig.otcDefaultValue],
			otcMandatory: [this.orgTicketCustomConfig.otcMandatory],
			otcDisplayInWeb: [this.orgTicketCustomConfig.otcDisplayInWeb],
			otcDisplayInMobile: [this.orgTicketCustomConfig.otcDisplayInMobile],
			otcDisplayInList: [this.orgTicketCustomConfig.otcDisplayInList],
			otcDisplayOrder: [this.orgTicketCustomConfig.otcDisplayOrder],
			//Display Type
			otcAttributeType: [this.orgTicketCustomConfig.otcAttributeType, Validators.required],
			otcBusinessType: [this.orgTicketCustomConfig.otcBusinessType],
			otcDataType: [this.orgTicketCustomConfig.otcDataType],
			otcDatasource: [this.orgTicketCustomConfig.otcDatasource],
			//Text
			otcData: [this.orgTicketCustomConfig.otcData]
		});

		this.id = this.route.snapshot.params['id'];
		this.bpId = this.route.snapshot.params['bpId'];
    console.log("Bp Id-->"+this.bpId);
		if (this.id > 0) {
			this.ticketcustomconfigService.getTicketCustomAttribute(this.id).subscribe((res) => {
				console.log(res);
				this.customAttributeForm.controls['otcName'].setValue(res['otcName']);
				if (res['status'] == true) {
					this.customAttributeForm.controls['status'].setValue('Enable');
				} else {
					this.customAttributeForm.controls['status'].setValue('Disable');
				}

				if (res['otcFieldType']) {
					if (res['otcFieldType'] == 'STEXT' || res['otcFieldType'] == 'LTEXT') {
						this.displayTypeOptions = ['Alphanumeric', 'Numeric', 'Select', 'Multi Select'];
						this.customAttributeForm.controls['otcMinLength'].setValue(res['otcMinLength']);
						this.customAttributeForm.controls['otcMaxLength'].setValue(res['otcMaxLength']);
						this.customAttributeForm.controls['otcBusinessType'].setValue(res['otcBusinessType']);
						this.customAttributeForm.controls['otcDataType'].setValue(res['otcDataType']);
						this.customAttributeForm.controls['otcDatasource'].setValue(res['otcDatasource']);
						this.customAttributeForm.controls['otcData'].setValue(res['otcData']);
					} else if (res['otcFieldType'] == 'BOOLEAN' || res['otcFieldType'] == 'DATE') {
						if (res['otcFieldType'] == 'BOOLEAN') {
							this.displayTypeOptions = ['Check Box'];
						} else if (res['otcFieldType'] == 'DATE') {
							this.displayTypeOptions = ['Date', 'Date Time'];
						}
						this.customAttributeForm.controls['otcMinLength'].disable();
						this.customAttributeForm.controls['otcMaxLength'].disable();
						this.customAttributeForm.controls['otcBusinessType'].disable();
						this.customAttributeForm.controls['otcDataType'].disable();
						this.customAttributeForm.controls['otcDatasource'].disable();
						this.customAttributeForm.controls['otcData'].disable();
					}
				}
				this.customAttributeForm.controls['otcFieldType'].setValue(res['otcFieldType']);
				this.customAttributeForm.controls['otcIntegrationLabel'].setValue(res['otcIntegrationLabel']);
				this.customAttributeForm.controls['otcToolTip'].setValue(res['otcToolTip']);
				this.customAttributeForm.controls['otcDefaultValue'].setValue(res['otcDefaultValue']);
				this.customAttributeForm.controls['otcMandatory'].setValue(res['otcMandatory']);
				this.customAttributeForm.controls['otcDisplayInWeb'].setValue(res['otcDisplayInWeb']);
				this.customAttributeForm.controls['otcDisplayInMobile'].setValue(res['otcDisplayInMobile']);
				this.customAttributeForm.controls['otcDisplayInList'].setValue(res['otcDisplayInList']);
				this.customAttributeForm.controls['otcAttributeType'].setValue(res['otcAttributeType']);
				this.order.forEach(element => {
					if (element == res['otcDisplayOrder']) {
						this.customAttributeForm.controls['otcDisplayOrder'].setValue(element);
					}
				});
			});
		}
	}

	onSubmit() {
		this.submitted = true;
		// stop the process here if form is invalid
		if (this.customAttributeForm.invalid) {
			return;
		}
		let payload = this.customAttributeForm.value;
		if ((payload.status = 'Enable')) {
			payload.status = true;
		} else {
			payload.status = false;
		}
		payload['id'] = this.id;
		console.log(payload);
		this.ticketcustomconfigService.updateTicketCustomAttribute(payload).subscribe((res) => {
			console.log(res);
			this.responseObject = res;
			alert(this.responseObject.message);
			this.router.navigate([ '/admin/ticket-custom-config/'+this.bpId ]);
		});
	}

}
