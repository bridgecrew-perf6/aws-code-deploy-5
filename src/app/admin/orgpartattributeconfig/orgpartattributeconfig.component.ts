import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgPartCustomConfig } from 'src/app/model/orgPartCustomConfig';
import { PartcustomconfigService } from 'src/app/services/partcustomconfig.service';

@Component({
  selector: 'app-orgpartattributeconfig',
  templateUrl: './orgpartattributeconfig.component.html',
  styleUrls: ['./orgpartattributeconfig.component.css']
})
export class OrgpartattributeconfigComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
		private route: ActivatedRoute,
    private router: Router,
    private partcustomconfigService: PartcustomconfigService,
  ) { }
  id: number;
	bpId: number;
  labels = { title: 'Part Custom Attribute Config', button: 'Save' };
  customAttributeForm: FormGroup;
  submitted: boolean = false;
  orgPartCustomConfig: OrgPartCustomConfig;
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
    this.orgPartCustomConfig = new OrgPartCustomConfig();
    this.customAttributeForm = this.formBuilder.group({
      optName: [this.orgPartCustomConfig.optName, Validators.required],
			status: [this.orgPartCustomConfig.status, Validators.required],
      optFieldType: [{ value: this.orgPartCustomConfig.optFieldType, disabled: true }, Validators.required],
			optIntegrationLabel: [this.orgPartCustomConfig.optIntegrationLabel],
			optMinLength: [this.orgPartCustomConfig.optMinLength],
			optMaxLength: [this.orgPartCustomConfig.optMaxLength],
			optToolTip: [this.orgPartCustomConfig.optToolTip],
			optDefaultValue: [this.orgPartCustomConfig.optDefaultValue],
			optMandatory: [this.orgPartCustomConfig.optMandatory],
			optDisplayInWeb: [this.orgPartCustomConfig.optDisplayInWeb],
			optDisplayInMobile: [this.orgPartCustomConfig.optDisplayInMobile],
			optDisplayInList: [this.orgPartCustomConfig.optDisplayInList],
			optDisplayOrder: [this.orgPartCustomConfig.optDisplayOrder],
			//Display Type
			optAttributeType: [this.orgPartCustomConfig.optAttributeType, Validators.required],
			optBusinessType: [this.orgPartCustomConfig.optBusinessType],
			optDataType: [this.orgPartCustomConfig.optDataType],
			optDatasource: [this.orgPartCustomConfig.optDatasource],
			//Text
			optData: [this.orgPartCustomConfig.optData]
    });

    this.id = this.route.snapshot.params['id'];
		this.bpId = this.route.snapshot.params['bpId'];
    console.log("Bp Id-->"+this.bpId);

    if (this.id > 0) {
			this.partcustomconfigService.getPartCustomAttribute(this.id).subscribe((res) => {
        console.log(res);
        this.customAttributeForm.controls['optName'].setValue(res['optName']);
        if (res['status'] == true) {
					this.customAttributeForm.controls['status'].setValue('Enable');
				} else {
					this.customAttributeForm.controls['status'].setValue('Disable');
        }
        if (res['optFieldType']) {
					if (res['optFieldType'] == 'STEXT' || res['optFieldType'] == 'LTEXT') {
						this.displayTypeOptions = ['Alphanumeric', 'Numeric', 'Select', 'Multi Select'];
						this.customAttributeForm.controls['optMinLength'].setValue(res['optMinLength']);
						this.customAttributeForm.controls['optMaxLength'].setValue(res['optMaxLength']);
						this.customAttributeForm.controls['optBusinessType'].setValue(res['optBusinessType']);
						this.customAttributeForm.controls['optDataType'].setValue(res['optDataType']);
						this.customAttributeForm.controls['optDatasource'].setValue(res['optDatasource']);
						this.customAttributeForm.controls['optData'].setValue(res['optData']);
					} else if (res['optFieldType'] == 'BOOLEAN' || res['optFieldType'] == 'DATE') {
						if (res['optFieldType'] == 'BOOLEAN') {
							this.displayTypeOptions = ['Check Box'];
						} else if (res['optFieldType'] == 'DATE') {
							this.displayTypeOptions = ['Date', 'Date Time'];
						}
						this.customAttributeForm.controls['optMinLength'].disable();
						this.customAttributeForm.controls['optMaxLength'].disable();
						this.customAttributeForm.controls['optBusinessType'].disable();
						this.customAttributeForm.controls['optDataType'].disable();
						this.customAttributeForm.controls['optDatasource'].disable();
						this.customAttributeForm.controls['optData'].disable();
					}
        }
        this.customAttributeForm.controls['optFieldType'].setValue(res['optFieldType']);
        this.customAttributeForm.controls['optFieldType'].setValue(res['optFieldType']);
				this.customAttributeForm.controls['optIntegrationLabel'].setValue(res['optIntegrationLabel']);
				this.customAttributeForm.controls['optToolTip'].setValue(res['optToolTip']);
				this.customAttributeForm.controls['optDefaultValue'].setValue(res['optDefaultValue']);
				this.customAttributeForm.controls['optMandatory'].setValue(res['optMandatory']);
				this.customAttributeForm.controls['optDisplayInWeb'].setValue(res['optDisplayInWeb']);
				this.customAttributeForm.controls['optDisplayInMobile'].setValue(res['optDisplayInMobile']);
				this.customAttributeForm.controls['optDisplayInList'].setValue(res['optDisplayInList']);
				this.customAttributeForm.controls['optAttributeType'].setValue(res['optAttributeType']);
				this.order.forEach(element => {
					if (element == res['optDisplayOrder']) {
						this.customAttributeForm.controls['optDisplayOrder'].setValue(element);
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
		this.partcustomconfigService.updatePartCustomAttribute(payload).subscribe((res) => {
			console.log(res);
			this.responseObject = res;
			alert(this.responseObject.message);
			this.router.navigate([ '/admin/part-custom-config/'+this.bpId ]);
		});
	}

}
