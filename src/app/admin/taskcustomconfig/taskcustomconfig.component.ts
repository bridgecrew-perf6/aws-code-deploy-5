import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskcustomconfigService } from 'src/app/services/taskcustomconfig.service';

@Component({
	selector: 'app-taskcustomconfig',
	templateUrl: './taskcustomconfig.component.html',
	styleUrls: [ './taskcustomconfig.component.css' ]
})
export class TaskcustomconfigComponent implements OnInit {
	constructor(
		private router: Router,
		private cd: ChangeDetectorRef,
		private route: ActivatedRoute,
		private taskCustomConfigService: TaskcustomconfigService
	) {}

	taskCustomConfigData: any = [];
	taskConfigCols: any = [];
	taskId: number;
	ngOnInit(): void {
		this.taskId = this.route.snapshot.params['taskId'];
		this.taskCustomConfigService.getTaskCustomAttributes(this.taskId).subscribe((res) => {
			let responseArray: any = [];
			responseArray = res;
			responseArray.sort(
				(a, b) => (a.tctDisplayOrder > b.tctDisplayOrder ? 1 : b.tctDisplayOrder > a.tctDisplayOrder ? -1 : 0)
			);
			this.taskCustomConfigData = responseArray;
			this.taskCustomConfigData.forEach((element) => {
				if ((element['status'] = true)) {
					element['enable'] = 'Enabled';
				} else {
					element['enable'] = 'Disabled';
				}
			});

			this.taskConfigCols = [
				{ field: 'tctName', header: 'Attribute Name', link: true },
				{ field: 'tctFieldType', header: 'Type', link: false },
				{ field: 'tctDisplayOrder', header: 'Display Order', link: false },
				{ field: 'enable', header: 'Status', link: false }
			];
		});
	}

	selectionChanged(data) {
		this.router.navigate([ '/admin/task-attribute-config/' + this.taskId + '/' + data.id ]);
	}
}
