import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OrgComponent } from './org/org.component';
import { LocationComponent } from './location/location.component';
import { SkillComponent } from './skill/skill.component';
import { RoleComponent } from './role/role.component';
import { LocationdetailComponent } from './locationdetail/locationdetail.component';
import { SublocationComponent } from './sublocation/sublocation.component';
import { SublocationdetailComponent } from './sublocationdetail/sublocationdetail.component';
import { SkilldetailComponent } from './skilldetail/skilldetail.component';
import { OrgdetailComponent } from './orgdetail/orgdetail.component';
import { RoledetailComponent } from './roledetail/roledetail.component';
import { SettingsComponent } from './settings/settings.component';
import { CustomercustomconfigComponent } from './customercustomconfig/customercustomconfig.component';
import { CustomerattributeconfigComponent } from './customerattributeconfig/customerattributeconfig.component';
import { DependentdataComponent } from './dependentdata/dependentdata.component';
import { CustomerdependentdataconfigComponent } from './customerdependentdataconfig/customerdependentdataconfig.component';
import { BpdependentdataconfigComponent } from './bpdependentdataconfig/bpdependentdataconfig.component';
import { DependentshowhideComponent } from './dependentshowhide/dependentshowhide.component';
import { CustomerdependentshowhideComponent } from './customerdependentshowhide/customerdependentshowhide.component';
import { BpdependentshowhideComponent } from './bpdependentshowhide/bpdependentshowhide.component';
import { CrewComponent } from './crew/crew.component';
import { CrewdetailsComponent } from './crewdetails/crewdetails.component';
import { BusinessprocessComponent } from './businessprocess/businessprocess.component';
import { BusinessprocessdetailsComponent } from './businessprocessdetails/businessprocessdetails.component';
import { DependentdatabpComponent } from './dependentdatabp/dependentdatabp.component';
import { DependentshowhidebpComponent } from './dependentshowhidebp/dependentshowhidebp.component';
import { TaskComponent } from './task/task.component';
import { TaskdetailComponent } from './taskdetail/taskdetail.component';
import { OrgticketcustomconfigComponent } from './orgticketcustomconfig/orgticketcustomconfig.component';
import { OrgticketattributeconfigComponent } from './orgticketattributeconfig/orgticketattributeconfig.component';
import { OrgpartcustomconfigComponent } from './orgpartcustomconfig/orgpartcustomconfig.component';
import { OrgpartattributeconfigComponent } from './orgpartattributeconfig/orgpartattributeconfig.component';
import { TaskcustomconfigComponent } from './taskcustomconfig/taskcustomconfig.component';
import { TaskattributeconfigComponent } from './taskattributeconfig/taskattributeconfig.component';
import { TasksequenceComponent } from './tasksequence/tasksequence.component';


@NgModule({
  declarations: [AdminComponent, OrgComponent, LocationComponent, SkillComponent,
    RoleComponent, LocationdetailComponent, SublocationComponent, SublocationdetailComponent, SkilldetailComponent, OrgdetailComponent, RoledetailComponent, SettingsComponent, CustomercustomconfigComponent, CustomerattributeconfigComponent, DependentdataComponent, CustomerdependentdataconfigComponent, BpdependentdataconfigComponent, DependentshowhideComponent, CustomerdependentshowhideComponent, BpdependentshowhideComponent, CrewComponent, CrewdetailsComponent, BusinessprocessComponent, BusinessprocessdetailsComponent, DependentdatabpComponent, DependentshowhidebpComponent, TaskComponent, TaskdetailComponent, OrgticketcustomconfigComponent, OrgticketattributeconfigComponent, OrgpartcustomconfigComponent, OrgpartattributeconfigComponent, TaskcustomconfigComponent, TaskattributeconfigComponent, TasksequenceComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
