import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Dependentdataconfig } from 'src/app/model/dependentdataconfig';
import { LocationService } from '../../services/location.service';
import { DependentdataconfigService } from '../../services/dependentdataconfig.service';
import { BusinessProcessService } from 'src/app/services/business-process.service';
import { TaskService } from 'src/app/services/task.service';
import { TicketcustomconfigService } from 'src/app/services/ticketcustomconfig.service';
import { PartcustomconfigService } from 'src/app/services/partcustomconfig.service';
import { TaskcustomconfigService } from 'src/app/services/taskcustomconfig.service';

@Component({
  selector: 'app-bpdependentdataconfig',
  templateUrl: './bpdependentdataconfig.component.html',
  styleUrls: ['./bpdependentdataconfig.component.css']
})
export class BpdependentdataconfigComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
		private router: Router,
    private cd: ChangeDetectorRef,
    private locationService: LocationService,
    private businessProcessService:BusinessProcessService,
    private taskService: TaskService,
    private ticketcustomconfigService: TicketcustomconfigService,
    private partcustomconfigService: PartcustomconfigService,
    private taskCustomConfigService: TaskcustomconfigService,
    private dependentdataconfigService: DependentdataconfigService) { }

    id: number;
    BPDependentForm: FormGroup;
    depentDataConfig: Dependentdataconfig;
    existingDependentData: any;
    submitted = false;
    BPDependentConfigData: any = [];
    bp: any = [];
    taskData: any=[];
    bpDependentDataConfig: any=[];
    workLocations: any = [];
    heading={
      title:"BP Dependent Data Config",
      button:"Save"
    };
    level:string;
    businessProcess:any=[];

    bPChanged(data){
      if(this.level=="TICKET"){
        this.ticketcustomconfigService.getTicketCustomAttributes(this.businessProcess.id).subscribe((res) => {
          this.bpDependentDataConfig = res;
          console.log("ticketData",this.bpDependentDataConfig);
        });
      }
      else if(this.level=="PART"){
        this.partcustomconfigService.getPartCustomAttributes(this.businessProcess.id).subscribe((res) => {
          this.bpDependentDataConfig = res;
          console.log("partData",this.bpDependentDataConfig);
        });
      }
      else if(this.level=="TASK"){
        this.taskService.getTasks(this.businessProcess.id).subscribe((res) => {
          this.taskData = res;
          console.log("task",this.taskData);
        });
       
      }
      
    }

    levelChanged(data:string){
      // Parent and child Attributes on Level change

      //on Ticket Selected
      if(data=="TICKET"){
        this.ticketcustomconfigService.getTicketCustomAttributes(this.businessProcess.id).subscribe((res) => {
          this.bpDependentDataConfig = res;
          console.log("ticketData",this.bpDependentDataConfig);
        });
      }
      //on Part Selected
      else if(data=="PART"){
        this.partcustomconfigService.getPartCustomAttributes(this.businessProcess.id).subscribe((res) => {
          this.bpDependentDataConfig = res;
          console.log("partData",this.bpDependentDataConfig);
        });
      }
      //On Task Selected
      else if(data=="TASK"){
        this.taskService.getTasks(this.businessProcess.id).subscribe((res) => {
          this.taskData = res;
          console.log("task",this.taskData);
        });
     
      }
    }

    //Task Attributes
    taskChanged(data){
      console.log("taskData..",data);
      this.taskCustomConfigService.getTaskCustomAttributes(data).subscribe((res) => {
        this.bpDependentDataConfig = res;
        console.log("taskData",this.bpDependentDataConfig);
      });
    }
  
    ngOnInit(): void {
  
      this.id = this.route.snapshot.params['id'];
  
  
      this.depentDataConfig = new Dependentdataconfig();
      this.depentDataConfig.childDataType = 'TEXT';
      this.depentDataConfig.parentType = 'Main';
     
  
      this.BPDependentForm = this.formBuilder.group({
        bp:[this.depentDataConfig.bp, [ Validators.required ]],
        level:[this.depentDataConfig.level, [ Validators.required ]],
        task:[this.depentDataConfig.task],
        parentAtt: [ this.depentDataConfig.parentAtt, [ Validators.required ] ],
        parentValue:[this.depentDataConfig.parentValue ,[ Validators.required,Validators.maxLength(200) ]],
        childAtt: [ this.depentDataConfig.childAtt, [ Validators.required ] ],
        childDataType: [ this.depentDataConfig.childDataType, [ Validators.required ] ],
        childValue: [ this.depentDataConfig.childValue,[ Validators.required ,Validators.maxLength(4000)]],
        childDataSource: [ this.depentDataConfig.childDataSource,[ Validators.required ,Validators.maxLength(150)]],
        parentType: [ this.depentDataConfig.parentType, [ Validators.required ]],
        workLocationId:[ this.depentDataConfig.workLocation]
      });
  
      if(this.BPDependentForm.controls.level.value =='TASK'){
        this.BPDependentForm.controls.task.setValidators([Validators.required]);
        this.BPDependentForm.controls.task.updateValueAndValidity();
      }
      this.isDisabled();
  
     
     //WorkLocations
      this.locationService.getLocation().
      subscribe(res => {
        this.workLocations = res;
        console.log(this.workLocations);
      });

      //Bussiness Process
      this.businessProcessService.getBusinessProcessByOrg().subscribe((res) => {
        this.bp= res;
        console.log("BussinessProcess",this.bp);
      });
  
      if (this.id > 0)
      {
        this.heading.title = "Update BP Dependent Data Config" ;
        this.heading.button = "Update";
  
        this.dependentdataconfigService.getBPDependentData(this.id).
        subscribe(res => {
           this.existingDependentData = res;
          
           this.BPDependentForm.controls['bp'].setValue(this.existingDependentData.bp);
           this.BPDependentForm.controls['level'].setValue(this.existingDependentData.level);
           this.BPDependentForm.controls['task'].setValue(this.existingDependentData.task);
           this.BPDependentForm.controls['parentAtt'].setValue(this.existingDependentData.parentAtt);
           this.BPDependentForm.controls['parentValue'].setValue(this.existingDependentData.parentValue);
           this.BPDependentForm.controls['childAtt'].setValue(this.existingDependentData.childAtt);
           this.BPDependentForm.controls['childDataType'].setValue(this.existingDependentData.childValueType);
           this.BPDependentForm.controls['childValue'].setValue(this.existingDependentData.childValue);
           this.BPDependentForm.controls['childDataSource'].setValue(this.existingDependentData.childDataSource);
           if(this.existingDependentData.dependentType == true){
            this.BPDependentForm.controls['parentType'].setValue("Main");
           }else{this.BPDependentForm.controls['parentType'].setValue("Sub");}
           this.BPDependentForm.controls['workLocationId'].setValue(this.existingDependentData.workLocationId);
           this.isDisabled();
        });
      } 
  
    }
  
    isDisabled() {
      if(this.BPDependentForm.value.childDataType =='TEXT') {
        this.BPDependentForm.controls['childValue'].enable();
        this.BPDependentForm.controls['childDataSource'].disable();
        this.BPDependentForm.controls['childDataSource'].setValue(null);
      } else {
        this.BPDependentForm.controls['childValue'].disable();
        this.BPDependentForm.controls['childDataSource'].enable();
        this.BPDependentForm.controls['childValue'].setValue(null);
       }
     }
  
    onSubmit() {
      this.submitted = true;
      console.log("submit", this.BPDependentForm.value);
      // stop the process here if form is invalid
      if (this.BPDependentForm.invalid) {
        return;
      }
      let dependentDataConfigPayLoad = this.BPDependentForm.value;
      console.log("submit", this.BPDependentForm.value, "-----",dependentDataConfigPayLoad);
      dependentDataConfigPayLoad["module"] = this.BPDependentForm.value.level;
      if(dependentDataConfigPayLoad["parentType"] == "Main"){
        dependentDataConfigPayLoad["dependentType"] = true;
      }else{dependentDataConfigPayLoad["dependentType"] = false;}
      if(dependentDataConfigPayLoad["childDataType"] == "TEXT"){
        dependentDataConfigPayLoad["childValueType"] = "TEXT";
      }else{dependentDataConfigPayLoad["childValueType"] = "Data Source";}
  
      if(this.id >0){
        dependentDataConfigPayLoad["id"] = this.id;
        this.dependentdataconfigService.updateBPDependentData(dependentDataConfigPayLoad)
        .subscribe((res) => {
          alert(res.message);
          this.router.navigate(['/admin/dependent-data-bp']); 
        });
      }
      else{
        this.dependentdataconfigService.saveBPDependentData(dependentDataConfigPayLoad)
        .subscribe((res) => {
          alert(res.message);
          this.router.navigate(['/admin/dependent-data-bp']); 
        });
      }
    }

}
