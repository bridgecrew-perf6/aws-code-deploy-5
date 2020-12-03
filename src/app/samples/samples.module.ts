import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SamplesRoutingModule } from './samples-routing.module';
import { SamplesComponent } from './samples.component';
import { DatagridComponent } from './datagrid/datagrid.component';
import { DatetimepickComponent } from './datetimepick/datetimepick.component';
import { FormComponent } from './form/form.component';
import { DisplayComponent } from './display/display.component'; 
@NgModule({
  declarations: [SamplesComponent, DatagridComponent, DatetimepickComponent, FormComponent, DisplayComponent],
  imports: [
    CommonModule,
    SharedModule,
    SamplesRoutingModule
  ]
})
export class SamplesModule { }
