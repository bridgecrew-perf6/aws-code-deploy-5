import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/model/task';
import { RoleService } from 'src/app/services/role.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { exit } from 'process';

declare var $: any;

@Component({
	selector: 'app-taskdetail',
	templateUrl: './taskdetail.component.html',
	styleUrls: [ './taskdetail.component.css' ]
})
export class TaskdetailComponent implements OnInit {
	task: Task;
	submitted = false;
	responseObject: any = {};

	constructor(
		private formBuilder: FormBuilder,
		private taskService: TaskService,
		private router: Router,
		private route: ActivatedRoute,
		private cd: ChangeDetectorRef,
		private roleService: RoleService,
		private modalService: NgbModal
	) {}
	taskDetailForm: FormGroup;
	bpId: number;
	id: number;
	roles: any = [];

	ngOnInit(): void {
		this.bpId = this.route.snapshot.params['bpId'];
		this.id = this.route.snapshot.params['id'];
		// Loading Roles
		this.roleService.getRole().subscribe((res) => {
			console.log('Roles --> ', res);
			if (res) {
				this.roles = res;
			}
		});
		// For create task form
		this.task = new Task();
		this.task.status = 'Enable';

		this.taskDetailForm = this.formBuilder.group({
			status: [ this.task.status, Validators.required ],
			name: [ this.task.name, Validators.required ],
			displayName: [ this.task.displayName, Validators.required ],
			description: [ this.task.description ],
			color: [ this.task.color ],
			integrationLabel: [ this.task.integrationLabel ],
			endStatus: [ this.task.endStatus ],
			signature: [ this.task.signature ],
			removeSchedule: [ this.task.removeSchedule ],
			locationMandatory: [ this.task.locationMandatory ],
			punchin: [ this.task.punchin ],
			attachmentMandatory: [ this.task.attachmentMandatory ],
			cameraAttachment: [ this.task.cameraAttachment ],
			showPart: [ this.task.showPart ],
			minAttachment: [ this.task.minAttachment ],
			complaintStatus: [ this.task.complaintStatus ],
			geofence: [ this.task.geofence ],
			geofenceType: [ this.task.geofenceType ],
			geofenceRadius: [ this.task.geofenceRadius ],
			otpGenerate: [ this.task.otpGenerate ],
			otpVerify: [ this.task.otpVerify ],
			otpDestination: [ this.task.otpDestination ],
			otpTemplate: [ this.task.otpTemplate ]
		});
		if (this.id > 0) {
			// Load the existing data
			this.taskService.getTaskDetails(this.id).subscribe((res) => {
				console.log(' Task Details ', res);
				if (res['status'] == true) {
					this.taskDetailForm.controls['status'].setValue('Enable');
				} else {
					this.taskDetailForm.controls['status'].setValue('Disable');
				}
				this.taskDetailForm.controls['name'].setValue(res['name']);
				this.taskDetailForm.controls['description'].setValue(res['description']);
				this.taskDetailForm.controls['displayName'].setValue(res['displayName']);
				this.taskDetailForm.controls['endStatus'].setValue(res['endStatus']);
				this.taskDetailForm.controls['integrationLabel'].setValue(res['integrationLabel']);
				this.taskDetailForm.controls['color'].setValue(res['color']);
				this.taskDetailForm.controls['signature'].setValue(res['signature']);
				this.taskDetailForm.controls['removeSchedule'].setValue(res['removeSchedule']);
				this.taskDetailForm.controls['locationMandatory'].setValue(res['locationMandatory']);
				this.taskDetailForm.controls['punchin'].setValue(res['punchin']);
				this.taskDetailForm.controls['attachmentMandatory'].setValue(res['attachmentMandatory']);
				this.taskDetailForm.controls['cameraAttachment'].setValue(res['cameraAttachment']);
				this.taskDetailForm.controls['showPart'].setValue(res['showPart']);
				this.taskDetailForm.controls['minAttachment'].setValue(res['minAttachment']);
				this.taskDetailForm.controls['complaintStatus'].setValue(res['complaintStatus']);
				this.taskDetailForm.controls['geofence'].setValue(res['geofence']);
				this.taskDetailForm.controls['geofenceRadius'].setValue(res['geofenceRadius']);
				this.taskDetailForm.controls['geofenceType'].setValue(res['geofenceType']);
				this.taskDetailForm.controls['otpGenerate'].setValue(res['otpGenerate']);
				this.taskDetailForm.controls['otpVerify'].setValue(res['otpVerify']);
				this.taskDetailForm.controls['otpDestination'].setValue(res['otpDestination']);
				this.taskDetailForm.controls['otpTemplate'].setValue(res['otpTemplate']);

				// Load the task - role mapping
				if (res['fzBusinessTaskRoles']) {
					let fzBusinessTaskRolesArray = res['fzBusinessTaskRoles'];
					fzBusinessTaskRolesArray.forEach((element) => {
						let statusString = 'Enable';
						if (element.status == false) {
							statusString = 'Disable';
						}
						let object = {
							id: element.id,
							slNo: this.serialNo++,
							fzRoleName: element.fzRoleName,
							status: statusString,
							fzRoleId: element.fzRoleId
						};
						this.tasksRoleGridData.push(object);
					});
					console.log('Existing task role mapping -->', this.tasksRoleGridData);
				}
			});
		}
	}

	onSubmit() {
		console.log('Onsubmit called loc');
		this.submitted = true;
		// stop the process here if form is invalid
		if (this.taskDetailForm.invalid) {
			return;
		} else {
			console.log('Payload ', this.taskDetailForm.value);
			let payload = this.taskDetailForm.value;
			payload['businessId'] = this.bpId;
			if (payload.status == 'Enable') {
				payload.status = true;
			} else {
				payload.status = false;
			}
			let taskRoleData = [];
			if (this.tasksRoleGridData) {
				this.tasksRoleGridData.forEach((element) => {
					let statusBool = true;
					let id;
					if (element.status != 'Enable') {
						statusBool = false;
					}
					if (element.id) {
						id = element.id;
					}
					let taskRoleObj = {
						id: id,
						fzRoleId: element.fzRoleId,
						fzRoleName: element.fzRoleName,
						fzTaskId: this.id,
						fzTaskName: payload['name'],
						status: statusBool
					};
					taskRoleData.push(taskRoleObj);
				});
			}
			payload['fzBusinessTaskRoles'] = taskRoleData;
			if (this.id > 0) {
				// Update Task
				payload['id'] = this.id;
				this.taskService.updateTask(payload).subscribe((res) => {
					console.log(res);
					this.responseObject = res;
					alert(this.responseObject.message);
					// this.router.navigate([ '/admin/location' ]);
				});
			} else {
				// Create Task
				this.taskService.saveTask(payload).subscribe((res) => {
					console.log(res);
					// this.router.navigate([ '/admin/location' ]);
					this.responseObject = res;
					this.id = res['id'];
					alert(this.responseObject.message);
				});
			}
		}
	}
	tasksRoleGridData: any = [];
	taskRoleColumns: any = [
		{ field: 'slNo', header: 'SL.No', link: false },
		{ field: 'fzRoleName', header: 'Role', link: false },
		{ field: 'status', header: 'Status', link: false }
	];
	selectedRole: any;
	roleStatus: any = 'Enable';
	serialNo: number = 1;
	editBtnTaskRoleMapping: boolean = true;
	isAdd: boolean;
	openRoleAddModal() {
		console.log('add role called');
		this.isAdd = true;
		this.selectedRole = null;
		this.roleStatus = 'Enable';
		$('#myModal2').modal('show');
	}

	addRoleToTask() {
		console.log('on add or update ', this.selectedRole, ' ', this.roleStatus);

		if (this.isAdd) {
			// Checking if role - mapping is already present
			if (this.tasksRoleGridData) {
				this.tasksRoleGridData.forEach((element) => {
					if (element.fzRoleId == this.selectedRole.id) {
						alert('Mapping already present');
						throw 'exit';
					}
				});
			}
			let object = {
				slNo: this.serialNo++,
				fzRoleName: this.selectedRole.name,
				status: this.roleStatus,
				fzRoleId: this.selectedRole.id
			};
			this.tasksRoleGridData.push(object);
			this.selectedRole = null;
			this.roleStatus = 'Enable';
		} else {
			// Update
			let isUpdate = false;
			this.tasksRoleGridData.forEach((element) => {
				// Check eligibility for update
				if (element.fzRoleId == this.selectedRole.id) {
					if (element.status != this.roleStatus && element.slNo == this.editingRecordIndex) {
						element.status = this.roleStatus;
						throw 'exit';
					}else{
						alert('Mapping already present');
						throw 'exit';
					}
					
				} else {
					isUpdate = true;
					return;
				}
			});
			if (isUpdate) {
				this.tasksRoleGridData.forEach((element) => {
					if (element.slNo == this.editingRecordIndex) {
						if (element.fzRoleId != this.selectedRole.id) {
							this.roles.forEach((role) => {
								if (role.name == this.selectedRole.name) {
									element.fzRoleId = role.id;
									element.fzRoleName = role.name;
								}
							});
						} else if (element.status != this.roleStatus) {
							element.status = this.roleStatus;
							throw 'exit';
						}
					}
				});
			}
		}

		console.log('new data ==> ', this.selectedRole);
	}

	editingRecordIndex: number;
	editTaskRoleMapping(data) {
		this.isAdd = false;
		this.roles.forEach((element) => {
			if (element.name == data.fzRoleName) {
				this.selectedRole = element;
			}
		});
		this.roleStatus = data.status;
		this.editingRecordIndex = data.slNo;
		$('#myModal2').modal('show');
	}
	
	redirectToTaskCustomConfig(){
		if (this.id) {
			this.router.navigate([ '/admin/task-custom-config/'+ this.id ]);
		}
		else{
			alert("Please save the task first to configure attributes")
		}
	}
}
