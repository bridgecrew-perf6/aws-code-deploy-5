import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import {Dependentdataconfig } from 'src/app/model/dependentdataconfig';
import { DependentdataconfigService } from '../../services/dependentdataconfig.service'

@Component({
  selector: 'app-dependentdatabp',
  templateUrl: './dependentdatabp.component.html',
  styleUrls: ['./dependentdatabp.component.css']
})
export class DependentdatabpComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private router:Router,
    private route: ActivatedRoute,
    private DependentdataconfigService: DependentdataconfigService) { }
    

    bpDepentForm: FormGroup;
    cols: any[] = [];
    editBtn: boolean = true;
    dependentDataConfig: any ={};
    dependentData:any[]=[];
    type:string=null;

   selectionChanged(data:any)
  {
    console.log(data);
  }

  editClicked(data:Dependentdataconfig)
  {
    this.router.navigate(['/admin/bp-dependent-data/'+data.id], {state:data});
    console.log(data);
  }

  typeChanged(type)
  {
     this.type = type;
     console.log("changedType"+type+"--"+this.type)
    this.getAllBPDependentData();
  }

  getAllBPDependentData(){
   let dependentDataTemp:any[]=[];
    this.DependentdataconfigService.getAllBPDependentData(this.type).subscribe((res) => {
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
          dependentDataTemp.push(dependentDataConfigured);
          i++;
      });
      this.dependentData = dependentDataTemp;
      this.cd.detectChanges();
    });
  }

  ngOnInit(): void {
    this.bpDepentForm = this.formBuilder.group({
      type:['']
    });

    this.getAllBPDependentData();
    this.cols = [
      { field: 'slNo', header: 'SL.No', link:false },
      { field: 'type', header: 'Type', link:false },
      { field: 'parentAtt', header: 'Parent', link:false },
      { field: 'childAtt', header: 'Child', link:false }
    ];

  }

}
