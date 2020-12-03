import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerCustomConfig } from 'src/app/model/customerCustomConfig';
import { CustomercustomconfigService } from 'src/app/services/customercustomconfig.service';

@Component({
	selector: 'app-customerattributeconfig',
	templateUrl: './customerattributeconfig.component.html',
	styleUrls: [ './customerattributeconfig.component.css' ]
})
export class CustomerattributeconfigComponent implements OnInit {
	constructor(
		private formBuilder: FormBuilder,
		private customerCustomConfigService: CustomercustomconfigService,
		private route: ActivatedRoute,
		private router: Router,
		private cd: ChangeDetectorRef
	) {}

	id: number;
	labels = { title: 'Custom Attribute Config', button: 'Save' };
	customAttributeForm: FormGroup;
	customerCustomConfig: CustomerCustomConfig;
	submitted: boolean = false;
	order: any = [
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
		20,
		21,
		22,
		23,
		24,
		25,
		26,
		27,
		28,
		29,
		30,
		31,
		32,
		33,
		34,
		35,
		36,
		37,
		38,
		39,
		40,
		41,
		42,
		43
	];
	displayTypeOptions = [ 'Alphanumeric', 'Numeric', 'Select', 'Multi Select', 'Date', 'Date Time', 'Check Box' ];
	responseObject: any;

	ngOnInit(): void {
		this.customerCustomConfig = new CustomerCustomConfig();

		this.customAttributeForm = this.formBuilder.group({
			occName: [ this.customerCustomConfig.occName, Validators.required ],
			status: [ this.customerCustomConfig.status, Validators.required ],
			occFieldType: [ { value: this.customerCustomConfig.occFieldType, disabled: true }, Validators.required ],
			occIntegrationLabel: [ this.customerCustomConfig.occIntegrationLabel ],
			occMinLength: [ this.customerCustomConfig.occMinLength ],
			occMaxLength: [ this.customerCustomConfig.occMaxLength ],
			occToolTip: [ this.customerCustomConfig.occToolTip ],
			occDefaultValue: [ this.customerCustomConfig.occDefaultValue ],
			occMandatory: [ this.customerCustomConfig.occMandatory ],
			occDisplayInWeb: [ this.customerCustomConfig.occDisplayInWeb ],
			occDisplayInMobile: [ this.customerCustomConfig.occDisplayInMobile ],
			occDisplayInList: [ this.customerCustomConfig.occDisplayInList ],
			occDisplayOrder: [ this.customerCustomConfig.occDisplayOrder ],
			//Display Type
			occAttributeType: [ this.customerCustomConfig.occAttributeType, Validators.required ],
			occBusinessType: [ this.customerCustomConfig.occBusinessType ],
			occDataType: [ this.customerCustomConfig.occDataType ],
			occDatasource: [ this.customerCustomConfig.occDatasource ],
			//Text
			occData: [ this.customerCustomConfig.occData ]
		});

		this.id = this.route.snapshot.params['id'];
		if (this.id > 0) {
			this.customerCustomConfigService.getCustomerCustomAttribute(this.id).subscribe((res) => {
				console.log(res);
				if (res['occDefault'] == true) {
					this.customAttributeForm.controls['occFieldType'].setValue(res['occFieldType']);
					this.customAttributeForm.controls['occFieldType'].disable()
				}
				if (res['occFieldType']) {
					if (res['occFieldType'] == 'STEXT' || res['occFieldType'] == 'LTEXT') {
						this.displayTypeOptions = [ 'Alphanumeric', 'Numeric', 'Select', 'Multi Select' ];
						this.customAttributeForm.controls['occMinLength'].setValue(res['occMinLength']);
						this.customAttributeForm.controls['occMaxLength'].setValue(res['occMaxLength']);
						this.customAttributeForm.controls['occBusinessType'].setValue(res['occBusinessType']);
						this.customAttributeForm.controls['occDataType'].setValue(res['occDataType']);
						this.customAttributeForm.controls['occDatasource'].setValue(res['occDatasource']);
						this.customAttributeForm.controls['occData'].setValue(res['occData']);
					} else if (res['occFieldType'] == 'BOOLEAN' || res['occFieldType'] == 'DATE') {
						if (res['occFieldType'] == 'BOOLEAN') {
							this.displayTypeOptions = [ 'Check Box' ];
						} else if (res['occFieldType'] == 'DATE') {
							this.displayTypeOptions = [ 'Date', 'Date Time' ];
						}
						this.customAttributeForm.controls['occMinLength'].disable();
						this.customAttributeForm.controls['occMaxLength'].disable();
						this.customAttributeForm.controls['occBusinessType'].disable();
						this.customAttributeForm.controls['occDataType'].disable();
						this.customAttributeForm.controls['occDatasource'].disable();
						this.customAttributeForm.controls['occData'].disable();
					}
				}
				this.customAttributeForm.controls['occName'].setValue(res['occName']);
				if (res['status'] == true) {
					this.customAttributeForm.controls['status'].setValue('Enable');
				} else {
					this.customAttributeForm.controls['status'].setValue('Disable');
				}
				if (res['occAttributeType']) {
					this.displayTypeOptions.forEach((element) => {
						if (element == res['occAttributeType']) {
							this.customAttributeForm.controls['occAttributeType'].setValue(element);
						}
					});
				}

				this.customAttributeForm.controls['occFieldType'].setValue(res['occFieldType']);
				this.customAttributeForm.controls['occIntegrationLabel'].setValue(res['occIntegrationLabel']);
				this.customAttributeForm.controls['occToolTip'].setValue(res['occToolTip']);
				this.customAttributeForm.controls['occDefaultValue'].setValue(res['occDefaultValue']);
				this.customAttributeForm.controls['occMandatory'].setValue(res['occMandatory']);
				this.customAttributeForm.controls['occDisplayInWeb'].setValue(res['occDisplayInWeb']);
				this.customAttributeForm.controls['occDisplayInMobile'].setValue(res['occDisplayInMobile']);
				this.customAttributeForm.controls['occDisplayInList'].setValue(res['occDisplayInList']);
				this.order.forEach(element => {
					if (element == res['occDisplayOrder']) {
						this.customAttributeForm.controls['occDisplayOrder'].setValue(element);
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
		this.customerCustomConfigService.updateCustomerCustomAttribute(payload).subscribe((res) => {
			console.log(res);
			this.responseObject = res;
			alert(this.responseObject.message);
			this.router.navigate([ '/admin/customer-custom-config' ]);
		});
	}
}
