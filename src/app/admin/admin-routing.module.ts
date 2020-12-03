import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { DependentshowhidebpComponent } from './dependentshowhidebp/dependentshowhidebp.component';
import { DependentdatabpComponent } from './dependentdatabp/dependentdatabp.component';
import { TaskComponent } from './task/task.component';
import { TaskdetailComponent } from './taskdetail/taskdetail.component';
import { OrgticketcustomconfigComponent } from './orgticketcustomconfig/orgticketcustomconfig.component';
import { OrgticketattributeconfigComponent } from './orgticketattributeconfig/orgticketattributeconfig.component';
import { OrgpartcustomconfigComponent } from './orgpartcustomconfig/orgpartcustomconfig.component';
import { OrgpartattributeconfigComponent } from './orgpartattributeconfig/orgpartattributeconfig.component';
import { TaskcustomconfigComponent } from './taskcustomconfig/taskcustomconfig.component';
import { TaskattributeconfigComponent } from './taskattributeconfig/taskattributeconfig.component';
import { TasksequenceComponent } from './tasksequence/tasksequence.component';

const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
			{ path: '', redirectTo: 'org', pathMatch: 'full' },
			{ path: 'org', component: OrgComponent },
			{ path: 'location', component: LocationComponent },
			{ path: 'sublocation', component: SublocationComponent },
			{ path: 'skill', component: SkillComponent },
			{ path: 'role', component: RoleComponent },
			{ path: 'org-detail/:id', component: OrgdetailComponent },
			{ path: 'location-detail', component: LocationdetailComponent },
			{ path: 'location-detail/:id', component: LocationdetailComponent },
			{ path: 'sublocation-detail', component: SublocationdetailComponent },
			{ path: 'sublocation-detail/:id/:subId', component: SublocationdetailComponent },
			{ path: 'skill-detail', component: SkilldetailComponent },
			{ path: 'skill-detail/:id', component: SkilldetailComponent },
			{ path: 'role-detail', component: RoledetailComponent },
			{ path: 'role-detail/:id', component: RoledetailComponent },
			{ path: 'settings', component: SettingsComponent },
			{ path: 'customer-custom-config', component: CustomercustomconfigComponent },
			{ path: 'customer-attribute-config/:id', component: CustomerattributeconfigComponent },
			{ path: 'dependent-data', component: DependentdataComponent },
			{ path: 'dependent-data-bp', component: DependentdatabpComponent },
			{ path: 'customer-dependent-data', component: CustomerdependentdataconfigComponent },
			{ path: 'bp-dependent-data', component: BpdependentdataconfigComponent },
			{ path: 'bp-dependent-data/:id', component: BpdependentdataconfigComponent},
			{ path: 'dependent-show-hide', component: DependentshowhideComponent },
			{ path: 'dependent-show-hide-bp', component: DependentshowhidebpComponent },
			{ path: 'customer-dependent-show-hide/:id', component: CustomerdependentshowhideComponent },
			{ path: 'bp-dependent-show-hide/:id', component: BpdependentshowhideComponent },
			{ path: 'crew', component: CrewComponent },
			{ path: 'crew-details/:id', component: CrewdetailsComponent } ,
			{ path: 'business-process', component: BusinessprocessComponent },
			{ path: 'business-process-detail/:bpId', component: BusinessprocessdetailsComponent },
			{ path: 'business-process-detail', component: BusinessprocessdetailsComponent },
			{ path: 'customer-dependent-data/:id', component: CustomerdependentdataconfigComponent },
			{path: 'task/:bpId', component: TaskComponent},
			{path: 'task-detail/:bpId/:id', component: TaskdetailComponent},
			{path: 'ticket-custom-config/:bpId', component: OrgticketcustomconfigComponent},
			{ path: 'ticket-attribute-config/:id/:bpId', component: OrgticketattributeconfigComponent },
			{path: 'part-custom-config/:bpId', component: OrgpartcustomconfigComponent},
			{ path: 'part-attribute-config/:id/:bpId', component: OrgpartattributeconfigComponent },
			{ path: 'task-custom-config/:taskId', component: TaskcustomconfigComponent },
			{ path: 'task-attribute-config/:taskId/:id', component: TaskattributeconfigComponent },
			{ path: 'task-sequence/:bpId', component: TasksequenceComponent },
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class AdminRoutingModule {}
