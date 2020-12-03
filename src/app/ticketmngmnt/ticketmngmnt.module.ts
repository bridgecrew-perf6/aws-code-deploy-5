import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketmngmntRoutingModule } from './ticketmngmnt-routing.module';
import { TicketmngmntComponent } from './ticketmngmnt.component';


@NgModule({
  declarations: [TicketmngmntComponent],
  imports: [
    CommonModule,
    TicketmngmntRoutingModule
  ]
})
export class TicketmngmntModule { }
