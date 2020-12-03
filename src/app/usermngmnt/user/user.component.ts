import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { InternationalizationService } from 'src/app/services/internationalization.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  val = 0;
  constructor(private router: Router,
    private internationalizationService: InternationalizationService, private userservice: UserService, private cd: ChangeDetectorRef) { }


  labels: any = this.internationalizationService.englishLabels['user.list'];
  
  userColumns = [
    { field: 'slNo', header: this.labels['user.list.grid.column1'], link: false },
    { field: 'name', header: this.labels['user.list.grid.column2'], link: false },
    { field: 'role', header: this.labels['user.list.grid.column3'], link: false },
    { field: 'loginID', header: this.labels['user.list.grid.column4'], link: false },
    { field: 'created', header: this.labels['user.list.grid.column5'], link: false },
    { field: 'action', header: this.labels['user.list.grid.column6'], link: true }
  ];
  OnUserDetails() {
    console.log("calling user.componnent.ts");
    this.router.navigate(["user-detail"]);
  }

  usersData: any = [];
  // userColumns: any = [];
  users: any = [];
  usersRef: any = [];

  //To check permissions
  userObj = {};
  usrId: number;
  isSuperAdmin: Boolean = false;

  ngOnInit(): void {
    var datePipe = new DatePipe("en-US");
    var session = sessionStorage.getItem('userDetails');
    this.userObj = JSON.parse(session);
    var userObj = JSON.parse(session);
    console.log('user object ', userObj);
    this.usrId = userObj.id;
    this.isSuperAdmin = userObj.usrSuperAdmin;
    // Load the UserPage labels if user lang not an English
		if (userObj.usrLangPref !== 'English') {
			var internationalization = sessionStorage.getItem('internationalization');
			var internationalizationObj = JSON.parse(internationalization);
			this.labels = internationalizationObj['user.list'];
			console.log('lables ', this.labels);
			this.userColumns = [
        { field: 'slNo', header: this.labels['user.list.grid.column1'], link: false },
        { field: 'name', header: this.labels['user.list.grid.column2'], link: false },
        { field: 'role', header: this.labels['user.list.grid.column3'], link: false },
        { field: 'loginID', header: this.labels['user.list.grid.column4'], link: false },
        { field: 'created', header: this.labels['user.list.grid.column5'], link: false },
        { field: 'action', header: this.labels['user.list.grid.column6'], link: true }
			];
			this.cd.detectChanges();
		}

    this.userservice.getUserDetails()
      .subscribe(response => {
        this.usersData = response;
        let user;
        console.log('Users Data  ' + this.usersData);
        for (var i = 0; i < this.usersData.length; i++) {
          console.log('User created ' + this.usersData[i].created);
          user = new User();
          user.id = this.usersData[i].id;
          user.slNo = i + 1;
          user.name = this.usersData[i].name; 
          user.role = this.usersData[i].role;
          user.loginID = this.usersData[i].loginID;
          user.created = this.usersData[i].created;
          user.created = datePipe.transform(user.created, 'dd/MM/yyyy');
          user.action = 'Edit';
          this.usersRef.push(user);
        }
        this.users = this.usersRef;
        this.cd.detectChanges();
      });
  }

  selectionChanged(data: any) {
    console.log('Inside DatagridComponent');
    var userId = data.id;
    console.log('user id ' + userId);
    this.router.navigate(['//user-detail/' + userId]);
  }
}
