import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartcustomconfigService } from 'src/app/services/partcustomconfig.service';

@Component({
  selector: 'app-orgpartcustomconfig',
  templateUrl: './orgpartcustomconfig.component.html',
  styleUrls: ['./orgpartcustomconfig.component.css']
})
export class OrgpartcustomconfigComponent implements OnInit {

  bpId: number;
  existingOrgPartCustomData: any;
  constructor(private router: Router,private route: ActivatedRoute,private partcustomconfigService: PartcustomconfigService ) { }

  partCustomConfigData: any = [];
  partConfigCols: any = [];

  ngOnInit(): void {

    this.bpId = this.route.snapshot.params['bpId'];
    console.log("Bp Id-->"+this.bpId);

    this.partcustomconfigService.getPartCustomAttributes(this.bpId).subscribe((res) => {
      this.existingOrgPartCustomData = res;
      console.log("All Part attributes "+this.existingOrgPartCustomData);
      this.partCustomConfigData = this.existingOrgPartCustomData;

      this.partCustomConfigData.forEach(element => {
        if (element['status'] = true) {
          element['enable'] = 'Enabled';
        } else {
          element['enable'] = 'Disabled';
        }
      });
    });
    this.partConfigCols = [
      { field: 'optName', header: 'Attribute Name', link: true },
      { field: 'optFieldType', header: 'Type', link: false },
      { field: 'optDisplayOrder', header: 'Display Order', link: false },
      { field: 'enable', header: 'Status', link: false },
    ];
  }

  selectionChanged(eventValue){
    console.log(eventValue);
    this.router.navigate([ '/admin/part-attribute-config/' + eventValue.id+'/'+this.bpId ]);
  }


}
