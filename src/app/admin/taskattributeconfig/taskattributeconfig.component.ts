import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskCustomConfig } from 'src/app/model/TaskCustomConfig';
import { TaskcustomconfigService } from 'src/app/services/taskcustomconfig.service';

@Component({
	selector: 'app-taskattributeconfig',
	templateUrl: './taskattributeconfig.component.html',
	styleUrls: [ './taskattributeconfig.component.css' ]
})
export class TaskattributeconfigComponent implements OnInit {
	constructor(
    private formBuilder: FormBuilder,
		private router: Router,
		private cd: ChangeDetectorRef,
		private route: ActivatedRoute,
		private taskCustomConfigService: TaskcustomconfigService
	) {}
	taskId: number;
  id: number;
  labels = { title: 'Task Attribute Config', button: 'Save' };
  taskAttributeForm: FormGroup;
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
  taskCustomConfig: TaskCustomConfig;
	ngOnInit(): void {
		this.taskId = this.route.snapshot.params['taskId'];
    this.id = this.route.snapshot.params['id'];
    this.taskCustomConfig = new TaskCustomConfig();

		this.taskAttributeForm = this.formBuilder.group({
			tctName: [ this.taskCustomConfig.tctName, Validators.required ],
			status: [ this.taskCustomConfig.status, Validators.required ],
			tctFieldType: [ { value: this.taskCustomConfig.tctFieldType, disabled: true }, Validators.required ],
			tctIntegrationLabel: [ this.taskCustomConfig.tctIntegrationLabel ],
			tctMinLength: [ this.taskCustomConfig.tctMinLength ],
			tctMaxLength: [ this.taskCustomConfig.tctMaxLength ],
			tctToolTip: [ this.taskCustomConfig.tctToolTip ],
			tctDefaultValue: [ this.taskCustomConfig.tctDefaultValue ],
			tctMandatory: [ this.taskCustomConfig.tctMandatory ],
			tctDisplayInWeb: [ this.taskCustomConfig.tctDisplayInWeb ],
			tctDisplayInMobile: [ this.taskCustomConfig.tctDisplayInMobile ],
			tctDisplayInList: [ this.taskCustomConfig.tctDisplayInList ],
			tctDisplayOrder: [ this.taskCustomConfig.tctDisplayOrder ],
			//Display Type
			tctAttributeType: [ this.taskCustomConfig.tctAttributeType, Validators.required ],
			tctBusinessType: [ this.taskCustomConfig.tctBusinessType ],
			tctDataType: [ this.taskCustomConfig.tctDataType ],
			tctDatasource: [ this.taskCustomConfig.tctDatasource ],
			//Text
			tctData: [ this.taskCustomConfig.tctData ]
    });
    
    if (this.id > 0) {
      this.taskCustomConfigService.getTaskCustomAttribute(this.taskId, this.id).subscribe((res) => {
        console.log('task data --> ', res);
        if (res['tctDefault'] == true) {
					this.taskAttributeForm.controls['tctFieldType'].setValue(res['tctFieldType']);
					this.taskAttributeForm.controls['tctFieldType'].disable()
				}
				if (res['tctFieldType']) {
					if (res['tctFieldType'] == 'STEXT' || res['tctFieldType'] == 'LTEXT') {
						this.displayTypeOptions = [ 'Alphanumeric', 'Numeric', 'Select', 'Multi Select' ];
						this.taskAttributeForm.controls['tctMinLength'].setValue(res['tctMinLength']);
						this.taskAttributeForm.controls['tctMaxLength'].setValue(res['tctMaxLength']);
						this.taskAttributeForm.controls['tctBusinessType'].setValue(res['tctBusinessType']);
						this.taskAttributeForm.controls['tctDataType'].setValue(res['tctDataType']);
						this.taskAttributeForm.controls['tctDatasource'].setValue(res['tctDatasource']);
						this.taskAttributeForm.controls['tctData'].setValue(res['tctData']);
					} else if (res['tctFieldType'] == 'BOOLEAN' || res['tctFieldType'] == 'DATE') {
						if (res['tctFieldType'] == 'BOOLEAN') {
							this.displayTypeOptions = [ 'Check Box' ];
						} else if (res['tctFieldType'] == 'DATE') {
							this.displayTypeOptions = [ 'Date', 'Date Time' ];
						}
						this.taskAttributeForm.controls['tctMinLength'].disable();
						this.taskAttributeForm.controls['tctMaxLength'].disable();
						this.taskAttributeForm.controls['tctBusinessType'].disable();
						this.taskAttributeForm.controls['tctDataType'].disable();
						this.taskAttributeForm.controls['tctDatasource'].disable();
						this.taskAttributeForm.controls['tctData'].disable();
					}
				}
				this.taskAttributeForm.controls['tctName'].setValue(res['tctName']);
				if (res['status'] == true) {
					this.taskAttributeForm.controls['status'].setValue('Enable');
				} else {
					this.taskAttributeForm.controls['status'].setValue('Disable');
				}
				if (res['tctAttributeType']) {
					this.displayTypeOptions.forEach((element) => {
						if (element == res['tctAttributeType']) {
							this.taskAttributeForm.controls['tctAttributeType'].setValue(element);
						}
					});
				}

				this.taskAttributeForm.controls['tctFieldType'].setValue(res['tctFieldType']);
				this.taskAttributeForm.controls['tctIntegrationLabel'].setValue(res['tctIntegrationLabel']);
				this.taskAttributeForm.controls['tctToolTip'].setValue(res['tctToolTip']);
				this.taskAttributeForm.controls['tctDefaultValue'].setValue(res['tctDefaultValue']);
				this.taskAttributeForm.controls['tctMandatory'].setValue(res['tctMandatory']);
				this.taskAttributeForm.controls['tctDisplayInWeb'].setValue(res['tctDisplayInWeb']);
				this.taskAttributeForm.controls['tctDisplayInMobile'].setValue(res['tctDisplayInMobile']);
				this.taskAttributeForm.controls['tctDisplayInList'].setValue(res['tctDisplayInList']);
				this.order.forEach(element => {
					if (element == res['tctDisplayOrder']) {
						this.taskAttributeForm.controls['tctDisplayOrder'].setValue(element);
					}
				});
      });
    }
		
  }
  

  onSubmit() {
		this.submitted = true;
		// stop the process here if form is invalid
		if (this.taskAttributeForm.invalid) {
			return;
		}
		let payload = this.taskAttributeForm.value;
		if ((payload.status = 'Enable')) {
			payload.status = true;
		} else {
			payload.status = false;
		}
		payload['id'] = this.id;
		console.log(payload);
		this.taskCustomConfigService.updateTaskCustomAttribute(payload).subscribe((res) => {
			console.log(res);
			this.responseObject = res;
			alert(this.responseObject.message);
			this.router.navigate([ '/admin/task-custom-config' ]);
		});
	}
}
