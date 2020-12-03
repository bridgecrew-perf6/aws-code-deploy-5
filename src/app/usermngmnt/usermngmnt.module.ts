import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UsermngmntRoutingModule } from './usermngmnt-routing.module';
import { UsermngmntComponent } from './usermngmnt.component';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserdetailsComponent } from './userdetails/userdetails.component';

@NgModule({
  declarations: [UsermngmntComponent, UserComponent, UserdetailsComponent],
  imports: [
    CommonModule,
    UsermngmntRoutingModule,
    SharedModule,
    ReactiveFormsModule,FormsModule
  ]
})
export class UsermngmntModule { }
