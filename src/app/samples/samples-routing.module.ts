import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SamplesComponent } from './samples.component';
import { DatagridComponent } from './datagrid/datagrid.component';
import { DatetimepickComponent } from './datetimepick/datetimepick.component';
import { FormComponent } from './form/form.component';
import { DisplayComponent } from './display/display.component'; 

const routes: Routes = [{ 
  path: '', component: SamplesComponent ,
  children: [
    {path: '', redirectTo: 'display', pathMatch: 'full'},
    {path: 'grid', component: DatagridComponent},
    {path: 'datepricker', component: DatetimepickComponent},
    {path: 'form', component: FormComponent},
    {path: 'display', component: DisplayComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SamplesRoutingModule { }
