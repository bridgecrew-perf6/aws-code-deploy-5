import { Component, OnInit, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from "../../services/user.service";
import { CountryService } from 'src/app/services/country.service';
import { TimezoneService } from 'src/app/services/timezone.service';
import { User } from 'src/app/model/user';
import { Role } from 'src/app/model/role';
import { ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { InternationalizationService } from 'src/app/services/internationalization.service';


@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  id: number;
  registerForm: FormGroup;
  submitted = false;
  countries: String[] = [];
  timezone: any[] = [];
  user: User;
  existingUserDetails: any;
  //For add role grid
  roleType: string
  name: string;
  manager: string;
  defaultRole: boolean;
  addRoleForm: FormGroup;
  addRoleColumns: any[] = [];
  addRoleData: any = [];
  componentGridHeading: String = 'Map Components';
  role: Role;
  roles: any = [];
  orgRoleData: any = [];
  managersData: any = [];
  managersDataDummy: any = [];
  deleteBtn: boolean = true;
  editBtn: boolean = true;
  userExistingRoles: any = [];
  joiningDate: String = "";
  confirmDate: String = "";
  resgDate: String = "";
  timeStampDate: String = "";
  invalid: boolean = false;
  managerList = [];
  finalManagerList = [];
  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location, private userService: UserService,
    private countryService: CountryService, private timezoneService: TimezoneService, private route: ActivatedRoute
    , private cd: ChangeDetectorRef, private internationalizationService: InternationalizationService) { }

  intLabels: any = this.internationalizationService.englishLabels['user.details'];
  labels: any = {
    title: this.intLabels['user.details.main.heading.add'],
    button: this.intLabels['user.details.main.button.save'],
    activeButton: this.intLabels['org.details.main.button.deactivate']
  };

  itemList = ['carrot', 'banana', 'apple', 'potato', 'tomato', 'cabbage', 'turnip', 'okra', 'onion', 'cherries', 'plum', 'mango'];
  userObj = {};
  ngOnInit(): void {
    // Load Logged in user
    var session = sessionStorage.getItem('userDetails');
    this.userObj = JSON.parse(session);
    //Load Page Lables
    if (this.userObj['usrLangPref'] !== 'English') {
      var internationalization = sessionStorage.getItem('internationalization');
      var internationalizationObj = JSON.parse(internationalization);
      this.intLabels = internationalizationObj['user.details'];
    }
    //Update title if user lang is other than english
    this.labels.title = this.intLabels['user.details.main.heading.add'];
    this.labels.button = this.intLabels['user.details.main.button.save'];
    // this.getManagerListAll();
    var datePipe = new DatePipe("en-US");
    this.countries = this.countryService.getCountryNamesArray();
    this.timezone = this.timezoneService.getTimezoneArray();
    this.user = new User();
    this.role = new Role();
    this.user.language = 'English';
    this.user.twoFA = false;

    this.registerForm = this.formBuilder.group({
      id: 0,
      name: [this.user.name, Validators.required],
      language: [this.user.language, Validators.required],
      address: [this.user.address],
      loginID: [this.user.loginID, Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['',],
      employeeNo: [this.user.employeeNo],
      state: [this.user.state],
      zipcode: [this.user.zipcode],
      city: [this.user.city],
      alternatePhone: this.user.alternatePhone,
      country: [this.user.country],
      phone: [this.user.phone, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      timezone: this.user.timezone,
      profileurl: this.user.profileurl,
      email: [this.user.email, [Validators.required, Validators.email]],
      IMEINO: this.user.IMEINO,
      cellNo: this.user.cellNo,
      joiningDate: this.user.joiningDate,
      confirmDate: this.user.confirmDate,
      resgDate: this.user.resgDate,
      twofasms: false,
      twofaemail: false,
      twoFA: false,
      userRoles: [this.user.userRoles]
    });

    // Getting the userID from the route
    // If UserID == 0 then new org creation if UserID > 0 then user should get update
    this.id = this.route.snapshot.params['id'];
    if (this.id > 0) {
      //Chnaging Lables 
      this.labels.title = this.intLabels['user.details.main.heading.update'];
      this.labels.button = this.intLabels['user.details.main.button.update'];
      // Getting the existing orgDtails
      this.userService.getUserdetailsById(this.id).subscribe(res => {
        this.existingUserDetails = res;
        this.user = this.existingUserDetails;
        console.log("Existing user " + this.user.name);
        this.registerForm.controls['id'].setValue(this.user.id);
        this.registerForm.controls['name'].setValue(this.user.name);
        this.registerForm.controls['language'].setValue(this.user.language);
        this.registerForm.controls['address'].setValue(this.user.address);
        this.registerForm.controls['employeeNo'].setValue(this.user.employeeNo);
        this.registerForm.controls['state'].setValue(this.user.state);
        this.registerForm.controls['zipcode'].setValue(this.user.zipcode);
        this.registerForm.controls['city'].setValue(this.user.city);
        this.registerForm.controls['alternatePhone'].setValue(this.user.alternatePhone);
        this.registerForm.controls['country'].setValue(this.user.country);
        this.registerForm.controls['timezone'].setValue(this.user.timezone);
        this.registerForm.controls['phone'].setValue(this.user.phone);
        this.registerForm.controls['profileurl'].setValue(this.user.profileurl);
        this.registerForm.controls['email'].setValue(this.user.email);
        this.registerForm.controls['cellNo'].setValue(this.user.cellNo);
        this.registerForm.controls['twoFA'].setValue(this.user.twoFA);
        this.registerForm.controls['twofasms'].setValue(this.user.twofasms);
        this.registerForm.controls['twofaemail'].setValue(this.user.twofaemail);
        this.joiningDate = this.timestampToDate(this.user.joiningDate);
        this.confirmDate = this.timestampToDate(this.user.confirmDate);
        this.resgDate = this.timestampToDate(this.user.resgDate);
        this.registerForm.controls['loginID'].setValue(this.user.loginID);
        this.registerForm.controls['password'].setValue(this.user.password);
      });
      this.cd.detectChanges();

      //To get all user roles that are already created 
      this.userService.getExistinGuserRoles(this.id).subscribe(response => {
        this.userExistingRoles = response;
        for (var i = 0; i < this.userExistingRoles.length; i++) {
          console.log('USer Existing Roles----->' + this.userExistingRoles[i]);
        }
      });
    }

    //For add role
    this.addRoleColumns = [
      { field: 'slNo', header: this.intLabels['user.details.main.addrole.column1'], link: false },
      { field: 'name', header: this.intLabels['user.details.main.addrole.column2'], link: false },
      { field: 'manager', header: this.intLabels['user.details.main.addrole.column3'], link: false },
      { field: 'defaultRole', header: this.intLabels['user.details.main.addrole.column4'], link: false }
    ];

    //To get all user roles that are already created 
    this.userService.getExistinGuserRoles(this.id).subscribe(response => {
      this.userExistingRoles = response;
      for (var i = 0; i < this.userExistingRoles.length; i++) {
        console.log('USer Existing Roles----->' + this.userExistingRoles[i]);

        let role;

        role = new Role();
        role.slNo = i + 1;
        role.name = this.userExistingRoles[i].name;
        role.manager = this.userExistingRoles[i].manager;
        role.defaultRole = this.userExistingRoles[i].defaultRole;
        role.managerId = this.userExistingRoles[i].managerId;
        this.addRoleData.push(role);
      }
      // this.addRoleData.push(this.addRoleDataRef);
    });

    //To Get All roles under org for add role drop down
    this.userService.getOrgRoles().subscribe(response => {
      this.orgRoleData = response;
      for (var i = 0; i < this.orgRoleData.length; i++) {
        console.log('Org role  ->' + this.orgRoleData[i].name);
      }
    });


  }
  onSubmit() {
    this.submitted = true;
    console.log("add role data final " + this.addRoleData);
    let role;
    //   if (this.registerForm.get('password').value !== this.registerForm.get('confirmPassword').value) {
    //     alert("Password should match with confirm password");
    // }

    if (this.registerForm.invalid) {
      return;
    }
    else {
      // if( !(this.registerForm.get('password') === this.registerForm.get('confirmPassword')) )
      // {
      //   alert("Password and Confirm Password should match");
      //   return;
      // }
      this.registerForm.controls['joiningDate'].setValue(this.toTimestamp(this.joiningDate));
      this.registerForm.controls['confirmDate'].setValue(this.toTimestamp(this.confirmDate));
      this.registerForm.controls['resgDate'].setValue(this.toTimestamp(this.resgDate));
      let isDefaultRolePresent: Boolean = false;
      let isRolePresent: Boolean = false;
      for (var i = 0; i < this.addRoleData.length; i++) {
        isRolePresent = true;
        console.log("user all three roles ---- boolean--->" + this.addRoleData[i].defaultRole);
        if (this.addRoleData[i].defaultRole == "true" || this.addRoleData[i].defaultRole == true) {
          isDefaultRolePresent = true;
          break;
        }
      }
      if (!isRolePresent) {
        alert("Please Select atleast one role");
        return;
      }
      else if (!isDefaultRolePresent) {
        alert("Please Select atleast one role as true");
        return;
      }

      for (var i = 0; i < this.addRoleData.length; i++) {
        role = new Role();
        role.name = this.addRoleData[i].name;
        role.manager = this.addRoleData[i].manager;
        role.defaultRole = this.addRoleData[i].defaultRole;
        console.log("Final complete roles" + this.role.name);
        console.log("All Manager's" + this.managersData);
        for (var j = 0; j < this.orgRoleData.length; j++) {
          if (this.orgRoleData[j].name === role.name) {
            role.id = this.orgRoleData[j].id;
            // role.managerId = this.orgRoleData[j].id;
            break;
          }
        }
        role.managerId = this.addRoleData[i].managerId;
        this.roles.push(role);
      }
      this.registerForm.controls['userRoles'].setValue(this.roles);
      console.log("Final org role data from db" + this.orgRoleData);


      if (this.id > 0) {
        this.userService.updateUser(this.registerForm.value)
          .subscribe((res) => {
            // alert(res.message); 
            this.router.navigate(['user']);
          });
      } else {
        this.userService.createUser(this.registerForm.value).subscribe
          ((res) => {
            this.router.navigate(['user']);
          });
      }
    }

  }

  onUserRoleSubmit() {
    let role;
    let slNo = 0;
    console.log("Save button is clicked!");
    console.log("role type" + this.name);

    
    role = new Role();
    slNo = slNo + 1;
    role.slNo = slNo;
    role.name = this.name;
    role.manager = this.manager;
    role.defaultRole = this.defaultRole;
    for (var i = 0; i < this.addRoleData.length; i++) {
      slNo = this.addRoleData[i].slNo;
      role.slNo = slNo + 1;
      if (role.name === this.addRoleData[i].name) {
        alert("Same role type can't be add multiple times to the same user");
        return;
      }
    }
    if (role.defaultRole == "true") {
      for (var i = 0; i < this.addRoleData.length; i++) {
        this.addRoleData[i].defaultRole = "false";
      }

    }
    for (var j = 0; j < this.managersData.length; j++) {
      if (this.managersData[j].name === role.manager) {
        role.managerId = this.managersData[j].id;
        break;
      }
    }
    this.addRoleData.push(role);

  }
  newEditedRole: any = {};
  newAddRoleData: any = [];
  onUserEditRoleSubmit() {
    this.isEditClicked = false;
    let role;
    let slNo = 0;
    console.log("Save button is clicked!");
    console.log("role type" + this.name);

    role = new Role();
    role.name = this.name;
    role.manager = this.manager;
    role.defaultRole = this.defaultRole;
    this.newEditedRole = this.editedRole;
    console.log("Editing Role Data" + this.editedRole);

    this.newAddRoleData = this.addRoleData;
    // for (var i = 0; i < this.addRoleData.length; i++) {
    //   if (role.name === this.addRoleData[i].name) {
    //     alert("Same role type can't be add multiple times to the same user");
    //     return;
    //   }
    // }

    if (role.defaultRole == "true") {
      for (var i = 0; i < this.addRoleData.length; i++) {
        this.addRoleData[i].defaultRole = "false";
      }
    }
    // for (var j = 0; j < this.managersData.length; j++) {
    //   if (this.managersData[j].name === role.manager) {
    //     role.managerId = this.managersData[j].id;
    //     break;
    //   }
    // }
    for (var i = 0; i < this.addRoleData.length; i++) {
      if (this.editedRole.name === this.addRoleData[i].name) {
        this.addRoleData[i].name = role.name;
        this.addRoleData[i].defaultRole = role.defaultRole;
        this.addRoleData[i].manager = this.manager;
        for (var j = 0; j < this.managersData.length; j++) {
          if (this.managersData[j].name === role.manager) {
            this.addRoleData[i].managerId = this.managersData[j].id;
          }
        }
      }
    }
    
    alert("Role updated Successfully");
    this.closebutton.nativeElement.click();
    // return;
    //this.addRoleData.push(role);

  }

  // getManagerList($event) {
  //   let search = (<HTMLInputElement>document.getElementById("managerId")).value;
  //   if (search.length >= 3) {
  //     console.log("request came after 3 words")
  //     this.userService.getManagersForUser(search).subscribe(res => {
  //       this.managersData = res;
  //       console.log("total managers for user " + this.managersData);
  //     });
  //   }
  // }

  // managetList = [];
  // getManagerListAll() {
  //   let search = "Mast";;//(<HTMLInputElement>document.getElementById("managerId")).value;
  //   if (search.length >= 3) {
  //     console.log("request came after 3 words")
  //     this.userService.getManagersForUser(search).subscribe(res => {
  //       this.managersData = res;
  //       console.log("total managers for user " + this.managersData);
  //       for (let emp of this.managersData) {
  //         this.managetList.push(emp.name);
  //       }
  //     });
  //   }
  // }


  joiningDateChanged(event) {
    console.log(event);
    this.user.joiningDate = event;
    this.joiningDate = event;
  }
  confirmDateChanged(event) {
    console.log(event);
    this.user.confirmDate = event;
    this.confirmDate = event;
  }
  resignDateChanged(event) {
    console.log(event);
    this.user.resgDate = event;
    this.resgDate = event;
  }

  editedRole: any = {};
  isEditClicked: boolean = false;
  @ViewChild('addRoleModal') fileInput: ElementRef;
  editClicked(data: any) {
    // console.log(data);
    this.isEditClicked = true;
    this.name = data.name;
    this.defaultRole = data.defaultRole;
    this.editedRole = data;
    this.manager = data.manager;
    this.fileInput.nativeElement.click();
    //this.content.show();
  }

  deleteClicked(data: any) {
    console.log(data);
    console.log('role name ' + data.name);
    const index = this.addRoleData.indexOf(data);
    if (index !== -1) {
      this.addRoleData.splice(index, 1);
    }
  }

  toTimestamp(strDate) {
    // var datum = Date.parse(strDate);
    // return datum/1000;
    let date = new Date(strDate);
    console.log(date.getTime());
    return date.getTime();
  }
  timestampToDate(timestampDate) {
    const datePipe = new DatePipe('en-US');
    const myFormattedDate = datePipe.transform(timestampDate, 'dd/MM/yyyy');
    // console.log("Final timestamp date " + myFormattedDate);
    let year = datePipe.transform(timestampDate, 'yyyy');
    let month = datePipe.transform(timestampDate, 'MM');
    let day = datePipe.transform(timestampDate, 'dd');

    var y1: number = parseInt(year);
    var m1: number = +month;
    var d1: number = +day;

    this.timeStampDate = y1 + "-" + m1 + "-" + d1;
    console.log("Final timestamp date " + this.timeStampDate);
    return this.timeStampDate;

  }
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { invalid: true };
    }
  }

  selectedVal: any = "";
  numbers: string[] = ['onne', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  // output: string[];
  output: any = [];

  // managerList = [];
  // finalManagerList = [];
  search(event) {
    this.managerList =[];
    this.finalManagerList
    this.userService.getManagersForUser(event.query).subscribe(res => {
      this.managersData = res;
      for (let emp of this.managersData) {
        console.log('latest manager Name ' + emp.name);
        console.log('latest manager Id ' + emp.id);
        this.managerList.push(emp.name);
      }
      this.finalManagerList = this.managerList;
    }
    );
  }
}
