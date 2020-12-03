import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketcustomconfigService } from 'src/app/services/ticketcustomconfig.service';
@Component({
  selector: 'app-orgticketcustomconfig',
  templateUrl: './orgticketcustomconfig.component.html',
  styleUrls: ['./orgticketcustomconfig.component.css']
})
export class OrgticketcustomconfigComponent implements OnInit {
  bpId: number;
  existingOrgTicketCustomData: any;
  constructor(private router: Router,private route: ActivatedRoute,private ticketcustomconfigService: TicketcustomconfigService ) { }

  ticketCustomConfigData: any = [];
  ticketConfigCols: any = [];

  ngOnInit(): void {

    this.bpId = this.route.snapshot.params['bpId'];
    console.log("Bp Id-->"+this.bpId);

    this.ticketcustomconfigService.getTicketCustomAttributes(this.bpId).subscribe((res) => {
      this.existingOrgTicketCustomData = res;
      console.log("All ticket attributes "+this.existingOrgTicketCustomData);
      this.ticketCustomConfigData = this.existingOrgTicketCustomData;

      this.ticketCustomConfigData.forEach(element => {
        if (element['status'] = true) {
          element['enable'] = 'Enabled';
        } else {
          element['enable'] = 'Disabled';
        }
      });
    });
    this.ticketConfigCols = [
      { field: 'otcName', header: 'Attribute Name', link: true },
      { field: 'otcFieldType', header: 'Type', link: false },
      { field: 'otcDisplayOrder', header: 'Display Order', link: false },
      { field: 'enable', header: 'Status', link: false },
    ];
  }

  selectionChanged(eventValue){
    console.log(eventValue);
    this.router.navigate([ '/admin/ticket-attribute-config/' + eventValue.id+'/'+this.bpId ]);
  }

}
