import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BusinessProcessService } from '../../services/business-process.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { InternationalizationService } from 'src/app/services/internationalization.service';
import { BusinessProcess } from 'src/app/model/businessProcess';

@Component({
  selector: 'app-businessprocess',
  templateUrl: './businessprocess.component.html',
  styleUrls: ['./businessprocess.component.css']
})
export class BusinessprocessComponent implements OnInit {

  constructor(private router: Router,private cd: ChangeDetectorRef,private internationalizationService: InternationalizationService, 
    private businessProcessService: BusinessProcessService) { }
    businessProcessResponseData: any = [];
    businessProcessData: any = [];
    businessProcessDataRef: any = [];

    labels: any = this.internationalizationService.englishLabels['bp.list'];

  businessProcessColumns = [
    { field: 'slNo', header: this.labels['bp.list.grid.column1'], link: false },
    { field: 'bpName', header: this.labels['bp.list.grid.column2'], link: false },
    { field: 'description', header: this.labels['bp.list.grid.column3'], link: false },
    { field: 'status', header: this.labels['bp.list.grid.column4'], link: false },
    { field: 'action', header: this.labels['bp.list.grid.column5'], link: true }
  ];


  ngOnInit(): void {
    console.log('business proces called');

    this.businessProcessService.getBusinessProcessByOrg().subscribe(response => {
      this.businessProcessResponseData = response;
      let businessProcess;
      console.log('business proces List ->'+this.businessProcessService);
      for (var i = 0; i < this.businessProcessResponseData.length; i++) {
        console.log('Bp Name' + this.businessProcessResponseData[i].name);
        console.log('Bp Id' + this.businessProcessResponseData[i].id);
        businessProcess = new BusinessProcess();
        businessProcess.id = this.businessProcessResponseData[i].id;
        businessProcess.slNo = i + 1;
        businessProcess.bpName = this.businessProcessResponseData[i].name;
        businessProcess.description = this.businessProcessResponseData[i].description;
        businessProcess.status = this.businessProcessResponseData[i].status;
        businessProcess.action = 'Edit';
        this.businessProcessDataRef.push(businessProcess);
      }
      this.businessProcessData = this.businessProcessDataRef;
      this.cd.detectChanges();

    });
  }

  selectionChanged(data: any) {
    console.log('Inside DatagridComponent');
    var bpId = data.id;  
    console.log('Business Process ID ' + bpId);
    this.router.navigate(['/admin/business-process-detail/' + bpId]);
  }

}
