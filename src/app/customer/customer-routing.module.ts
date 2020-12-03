import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { CustomerdetailComponent } from './customerdetail/customerdetail.component';

const routes: Routes = [{ 
  path: '', component: CustomerComponent,
  children: [
    {path: '', redirectTo: 'customer', pathMatch: 'full'},
    {path: 'customer', component: CustomerlistComponent },
    {path: 'customer-detail', component: CustomerdetailComponent },
    {path: 'customer-detail/:id', component: CustomerdetailComponent }

  ]}];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CustomerRoutingModule { }
