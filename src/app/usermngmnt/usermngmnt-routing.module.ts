import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsermngmntComponent } from './usermngmnt.component';
import { UserComponent } from './user/user.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';


const routes: Routes = [{ 
  path: '', component: UsermngmntComponent ,
  children: [
    {path: '', redirectTo: 'user', pathMatch: 'full'},
    {path: 'user', component: UserComponent},
    {path: 'user-detail/:id',component: UserdetailsComponent},
    // {path: 'user/:id', component: UserdetailsComponent},
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsermngmntRoutingModule { }
