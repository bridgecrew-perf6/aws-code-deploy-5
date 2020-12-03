import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/model/task';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: [ './task.component.css' ]
})
export class TaskComponent implements OnInit {
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

	selectionChanged(data: any) {
		console.log(data);
		this.router.navigate([ '/admin/task-detail/' + data.id ], { state: data });
	}

	editClicked(data: any) {
		console.log(data);
		this.router.navigate([ '/admin/task-detail/' + this.businessId + '/' + data.id ]);
	}

	deleteClicked(data: any) {
		console.log(data);
	}

	redirectToTask(event) {
		if (event === 'addTask') {
			this.router.navigate([ '/admin/task-detail/' + this.businessId + '/' + 0 ]);
		}
	}

	redirectToTaskSequence() {
		this.router.navigate([ '/admin/task-sequence/' + this.businessId ]);
	}

	ngOnInit(): void {
		this.businessId = this.route.snapshot.params['bpId'];
		this.taskColumns = [
			{ field: 'slNo', header: 'SL.No', link: false },
			{ field: 'name', header: 'Name', link: false },
			{ field: 'description', header: 'Description', link: false },
			{ field: 'status', header: 'Status', link: false }
		];
		this.taskService.getTasks(this.businessId).subscribe((res) => {
			this.taskData = res;
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
				this.tasksTempData.push(task);
			}
			this.tasksGridData = this.tasksTempData;
			this.cd.detectChanges();
		});
	}
}
