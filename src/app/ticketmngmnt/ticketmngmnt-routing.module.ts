import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketmngmntComponent } from './ticketmngmnt.component';

const routes: Routes = [{ path: '', component: TicketmngmntComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketmngmntRoutingModule { }
