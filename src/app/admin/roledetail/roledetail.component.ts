import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { RoleService } from '../../services/role.service';
import { InternationalizationService } from 'src/app/services/internationalization.service';


@Component({
  selector: 'app-roledetail',
  templateUrl: './roledetail.component.html',
  styleUrls: ['./roledetail.component.css']
})
export class RoledetailComponent implements OnInit {
  intLabels: any = this.internationalizationService.englishLabels['role.details'];
  id: number;
  roleForm: FormGroup;
  submitted = false;

  userObj = {};
  roleObj:any={};
  roleData:any = {};
  permissions: any = [];
  heading={
    title:this.intLabels['role.details.main.heading.add'],
    button:this.intLabels['role.details.main.button.save']
  };

  permissionGridDataKey: String = 'permissionId';
	permissionGridHeading: String = this.intLabels['role.details.permissions.heading'];
	permissionGridRowSelection: boolean = true;
	permissionGridColumns: any[] = [];
	selectedPermissions: any[] = [];
  selectedPermissionsTemp: any[] = [];
  

  constructor(private roleService : RoleService,
    private formBuilder: FormBuilder,
    private router:Router,
    private internationalizationService: InternationalizationService,
    private route: ActivatedRoute) { }

    public hasPermission(key:String)
    {
      
      if(this.userObj["permissions"].indexOf(key) > -1)
      {
        return true;
      }
      else
      {
        return false;
      }
  
    }


  selectComponent(data: any) {
    this.selectedPermissions = data;
    console.log("selectedPermissions",this.selectedPermissions);
  }

  //get Permission for a role
  getPermissions(roleId){
    this.roleService.getPermissions(roleId).
    subscribe(res => {
      this.permissions = res;  
      console.log("permissions",this.permissions);

      //Auto selection
      if(!(this.id >0)){
        this.selectedPermissions = this.permissions;
      }else{
        let selectedPerm = [];
        let permArray = [];
        let selectedPermissionsTemps = [];
        permArray = this.permissions;
        selectedPerm = this.roleObj.fzOrgRolePermDtoList;
        selectedPerm.forEach((perm) => {
          permArray.forEach((masterPerm) => {
              if (perm.permissionId == masterPerm.permissionId) {
                selectedPermissionsTemps.push(masterPerm);
              }
            });
          });
        console.log("selected Permissions1",selectedPermissionsTemps);
        this.selectedPermissions = selectedPermissionsTemps;
      }
     });
  }


  ngOnInit(): void {

    var session = sessionStorage.getItem('userDetails');
    this.userObj = JSON.parse(session);
    console.log('UserComponent',this.userObj);
    //Load Page Lables
    if (this.userObj['usrLangPref'] !== 'English') {
      var internationalization = sessionStorage.getItem('internationalization');
      var internationalizationObj = JSON.parse(internationalization);
      this.intLabels = internationalizationObj['role.details'];
    }
    this.heading.title = this.intLabels['role.details.main.heading.add'];
    this.heading.button =this.intLabels['role.details.main.button.save'];
    this.permissionGridHeading = this.intLabels['role.details.permissions.heading'];

    this.id = this.route.snapshot.params['id'];

    
    this.roleForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      roleId :['']
    });

    this.roleService.getParentRoles().
    subscribe(res => {
      this.roleData = res;  
      console.log("parentRoles",this.roleData);
      
    });

    if (this.id > 0)
    {
      this.heading.title = this.intLabels['role.details.main.heading.update'];
      this.heading.button = this.intLabels['role.details.main.button.update'];

      this.roleService.getRoleAndPermissionDetails(this.id).
      subscribe((res) => {
        this.roleObj = res;

        this.roleService.getPermissions(this.roleObj.roleId).
        subscribe(res => {
          this.permissions = res;  
          console.log("permissions",this.permissions);
    
          //Auto selection
          let selectedPerm = [];
          let permArray = [];
          permArray = this.permissions;
          selectedPerm = this.roleObj.fzOrgRolePermDtoList;
          selectedPerm.forEach((perm) => {
            permArray.forEach((masterPerm) => {
                if (perm.permissionId == masterPerm.permissionId) {
                  this.selectedPermissionsTemp.push(masterPerm);
                }
              });
            });
            console.log("selected Permissions",this.selectedPermissionsTemp);
            this.selectedPermissions = this.selectedPermissionsTemp;
         });
        
      });
    }
    this.permissionGridColumns = [
      { field: 'permissionName', header: this.intLabels['role.details.permissions.column1'], link: false },
      { field: 'permissionDesc', header: this.intLabels['role.details.permissions.column2'], link: false }
    ];
    

  }

  onSubmit() {
    this.submitted = true;
    // stop the process here if form is invalid
    if (this.roleForm.invalid) {
        return;
    }
    let rolePayload = this.roleObj;
		let permissions = [];
		this.selectedPermissions.forEach((permission) => {
			permissions.push(permission);
    });
		rolePayload['fzOrgRolePermDtoList'] = permissions;
		console.log(rolePayload);
    if(this.id>0){
      this.roleService.updateRole(rolePayload)
      .subscribe((res) => {
        alert(res.message);
        this.router.navigate(['/admin/role']); 
      });
    }else{
      this.roleService.saveRole(rolePayload)
      .subscribe((res) => {
        alert(res.message);
        this.router.navigate(['/admin/role']); 
      });
    }
    
  }

}
