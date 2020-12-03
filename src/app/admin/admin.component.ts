import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared-service.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: [ './admin.component.css' ]
})
export class AdminComponent implements OnInit {
	constructor(private sharedService: SharedService) {}

	public leftPanelCollapsed: boolean;
	public isLoading: boolean;
	permissions: String[] = [];
	userObj = {usrSuperAdmin : false};
	ngOnInit(): void {
		console.log('Admin Component');
		var session = sessionStorage.getItem('userDetails');
		this.userObj = JSON.parse(session);
	}

	public hasPermission(key: String) {
		if (this.userObj['usrSuperAdmin'] == true) {
			return true;
		}
		if (this.userObj['permissions'].indexOf(key) > -1) {
			return true;
		} else return false;
	}

	public collapseLeftPanel(leftPanelCollapsed:boolean){
		this.leftPanelCollapsed = leftPanelCollapsed;
		this.sharedService.setLHSCollapse(leftPanelCollapsed);
	}
}
