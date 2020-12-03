import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';

declare var $: any;

@Component({
	selector: 'app-tasksequence',
	templateUrl: './tasksequence.component.html',
	styleUrls: [ './tasksequence.component.css' ]
})
export class TasksequenceComponent implements OnInit {
	constructor(
		private taskService: TaskService,
		private router: Router,
		private route: ActivatedRoute,
		private cd: ChangeDetectorRef
	) {}

	businessId: number;
	taskColumns: any[] = [];
	taskGridData: Task[] = [];
	deleteBtn: boolean = false;
	editBtn: boolean = true;
	taskData: any = [];
	tasksTempData: Task[] = [];
	tasksGridData: Task[] = [];
	totalTaskList: any = [];
	selectNextTaskList: any = [];
	editedTask: any;
	ngOnInit(): void {
		this.businessId = this.route.snapshot.params['bpId'];
		this.taskColumns = [
			{ field: 'slNo', header: 'SL.No', link: false },
			{ field: 'name', header: 'Name', link: false },
			{ field: 'nextTask', header: 'Next Task', link: false },
			{ field: 'endStatus', header: 'End Status', link: false }
		];
		this.taskService.getTasks(this.businessId).subscribe((res) => {
			this.taskData = res;
			this.totalTaskList = res;
			console.log(this.taskData);
			let taskData = [];
			for (var i = 0; i < this.taskData.length; i++) {
				let task = new Task();
				task.id = this.taskData[i].id;
				task.businessId = this.taskData[i].businessId;
				task.slNo = i + 1;
				task.name = this.taskData[i].name;
				task.description = this.taskData[i].description;
				if ((this.taskData[i].status = true)) {
					task.status = 'Enable';
				} else {
					task.status = 'Disable';
				}
				task.nextTask = this.getNextTasksName(this.taskData[i]);
				task.endStatus = this.taskData[i].endStatus;
				this.tasksTempData.push(task);
			}
			this.tasksGridData = this.tasksTempData;
			this.cd.detectChanges();
		});
	}

	getNextTasksName(currentTask) {
		let nextTasksString = '';
		if (currentTask['nextTask'] != null && currentTask['nextTask'] != '') {
			let nextTaskIds = [];
			nextTaskIds = currentTask['nextTask'].split(',');
			this.totalTaskList.forEach((element) => {
				for (let index = 0; index < nextTaskIds.length; index++) {
					if (parseInt(nextTaskIds[index]) == element.id) {
						if (index == nextTaskIds.length - 1) {
							nextTasksString = nextTasksString + element.name;
						} else {
							nextTasksString = nextTasksString + element.name + ',';
						}
					}
				}
			});
		}
		return nextTasksString;
	}

	editClicked(data: any) {
		console.log(data);
		this.editedTask = data;
		this.selectNextTaskList = [];
		if (this.editedTask['nextTask'] != null && this.editedTask['nextTask'] != '') {
			let nextTaskIds = [];
			nextTaskIds = this.editedTask['nextTask'].split(',');
			this.totalTaskList.forEach((element) => {
				nextTaskIds.forEach((taskId) => {
					console.log('next Tasks -->', taskId, 'total id --> ', element.id);
					if (parseInt(taskId) == element.id) {
						this.selectNextTaskList.push(element);
					}
				});
			});
			console.log('next Tasks List -->', this.selectNextTaskList);
		}
		$('#myModal2').modal('show');
	}

	updateNexttask() {
		console.log('Next statuses --> ', this.selectNextTaskList);
		let nextTaskString = '';
		if (this.selectNextTaskList) {
			console.log('Array length ', this.selectNextTaskList.length);
			for (let index = 0; index < this.selectNextTaskList.length; index++) {
				console.log('id ', this.selectNextTaskList[index].id);
				if (index == this.selectNextTaskList.length - 1) {
					nextTaskString = nextTaskString + this.selectNextTaskList[index].id;
				} else {
					nextTaskString = nextTaskString + this.selectNextTaskList[index].id + ',';
				}
			}
		} else {
			alert('Please select next tasks before saving');
		}
		let payload = { id: this.editedTask.id };
		payload['nextTask'] = nextTaskString;
		console.log('final payload -->', payload);
		this.taskService.updateNextTask(payload).subscribe((res) => {
			alert(res['message']);
			$('#myModal2').modal('hide');
			this.selectNextTaskList = [];
		});
	}
}
