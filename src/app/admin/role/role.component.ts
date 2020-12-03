import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Roles } from '../../model/roles';
import { InternationalizationService } from 'src/app/services/internationalization.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  constructor(private roleService : RoleService,
    private router:Router,
    private route: ActivatedRoute,
    private internationalizationService: InternationalizationService,
    private cd: ChangeDetectorRef) { }

  roleData:any = {};
  userObj = {};
  cols: any[] = [];
  roles: Roles[] = [];
  rolesTemp: Roles[] =[];
  deleteBtn: boolean = false;
  editBtn: boolean = false;
  labels:any =this.internationalizationService.englishLabels['role.list'];
  heading :String;

  selectionChanged(data:any)
  {
    console.log(data);
    this.router.navigate(['/admin/role-detail/'+data.id], {state:data});
  }

  editClicked(data:any)
  {
    console.log(data);
    this.router.navigate(['/admin/role-detail/'+data.id], {state:data});
  }

  deleteClicked(data:any)
  {
    console.log(data);
    if(confirm(this.labels['role.list.grid.delete'])) {
      this.roleService.deleteRole(data).
      subscribe(res => {
        alert(res.message);
        window.location.reload();
      });
    }
  }

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
  
  ngOnInit(): void {
    var session = sessionStorage.getItem('userDetails');
    this.userObj = JSON.parse(session);
    console.log('UserComponent',this.userObj);

     // Load the Page labels
		if (this.userObj['usrLangPref'] !== 'English') {
      var internationalization = sessionStorage.getItem('internationalization');
      var internationalizationObj = JSON.parse(internationalization);
      this.labels = internationalizationObj['role.list'];
      }
      this.heading = this.labels['role.list.main.heading'];


     //check permission for Delete Role
     if(this.hasPermission('disable.role')){
      this.deleteBtn = true;
     }
 
    //check permission for Edit Role
    if(this.hasPermission('update.role')){
      this.editBtn = true;
    }

    this.roleService.getRole().
    subscribe(res => {
      this.roleData = res;  
      let role;  
      for(var i=0; i < this.roleData.length; i++) {
        role = new Roles();
        role.id = this.roleData[i].id;
        role.slNo = i+1;
        role.name =  this.roleData[i].name;
        role.description =  this.roleData[i].description;
        role.orgId =  this.roleData[i].orgId;
        role.roleId = this.roleData[i].roleId;
        this.rolesTemp.push(role);
      }
      this.roles = this.rolesTemp;
      this.cd.detectChanges();
    });

    this.cols = [
      { field: 'slNo', header: this.labels['role.list.grid.column1'], link:false },
      { field: 'name', header:this.labels['role.list.grid.column2'], link:true },
      { field: 'description', header: this.labels['role.list.grid.column3'], link:false }
    ];
    
  }

}
