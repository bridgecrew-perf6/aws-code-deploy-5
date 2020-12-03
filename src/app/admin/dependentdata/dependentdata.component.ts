import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {Dependentdataconfig } from 'src/app/model/dependentdataconfig';
import { DependentdataconfigService } from '../../services/dependentdataconfig.service'

@Component({
  selector: 'app-dependentdata',
  templateUrl: './dependentdata.component.html',
  styleUrls: ['./dependentdata.component.css']
})
export class DependentdataComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef,
    private router:Router,
    private route: ActivatedRoute,
    private DependentdataconfigService: DependentdataconfigService) { }
    

    cols: any[] = [];
    editBtn: boolean = true;
    dependentDataConfig: any ={};
    dependentDataTemp:any[]=[];
    dependentData:any[]=[];

   selectionChanged(data:any)
  {
    console.log(data);
  }

  editClicked(data:Dependentdataconfig)
  {
    if(data.type == "CUSTOMER"){
      this.router.navigate(['/admin/customer-dependent-data/'+data.id], {state:data});
    }
    console.log(data);
  }

  ngOnInit(): void {

    this.DependentdataconfigService.getAllCustomerDependentData().subscribe((res) => {
      this.dependentDataConfig = res;
      var i=1;
      this.dependentDataConfig.forEach(element => {
        let dependentDataConfigured= new Dependentdataconfig();
          dependentDataConfigured.id = element.id;
          dependentDataConfigured.slNo = i;
          dependentDataConfigured.type = element.module;
          dependentDataConfigured.parentAtt = element.parentAttribute;
          dependentDataConfigured.childAtt = element.childAttribute;
          dependentDataConfigured.parentValue = element.parentValue;
          dependentDataConfigured.childDataType = element.childValueType;
          dependentDataConfigured.childDataSource = element.childDataSource;
          dependentDataConfigured.childValue = element.childValue;
          dependentDataConfigured.parentType = element.dependentType;
          dependentDataConfigured.workLocationId = element.workLocationId;
          dependentDataConfigured.orgId = element.orgId;
          this.dependentDataTemp.push(dependentDataConfigured);
          i++;
      });
      this.dependentData =this.dependentDataTemp;
      this.cd.detectChanges();
    });

    this.cols = [
      { field: 'slNo', header: 'SL.No', link:false },
      { field: 'type', header: 'Type', link:false },
      { field: 'parentAtt', header: 'Parent', link:false },
      { field: 'childAtt', header: 'Child', link:false }
    ];

  }



}
