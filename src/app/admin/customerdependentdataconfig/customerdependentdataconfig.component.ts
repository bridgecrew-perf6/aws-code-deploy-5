import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Dependentdataconfig } from 'src/app/model/dependentdataconfig';
import { CustomercustomconfigService } from 'src/app/services/customercustomconfig.service';
import { LocationService } from '../../services/location.service';
import { DependentdataconfigService } from '../../services/dependentdataconfig.service';

@Component({
  selector: 'app-customerdependentdataconfig',
  templateUrl: './customerdependentdataconfig.component.html',
  styleUrls: ['./customerdependentdataconfig.component.css']
})
export class CustomerdependentdataconfigComponent implements OnInit {


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
		private router: Router,
    private cd: ChangeDetectorRef,
    private customerCustomConfigService: CustomercustomconfigService,
    private locationService: LocationService,
    private dependentdataconfigService: DependentdataconfigService) { }
    
  id: number;
  CustomerDependentForm: FormGroup;
  depentDataConfig: Dependentdataconfig;
  existingDependentData: any;
  submitted = false;
  customerCustomConfigData: any = [];
  workLocations: any = [];
  heading={
    title:"Customer Dependent Data Config",
    button:"Save"
  };

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];


    this.depentDataConfig = new Dependentdataconfig();
    this.depentDataConfig.childDataType = 'TEXT';
    this.depentDataConfig.parentType = 'Main';
   

    this.CustomerDependentForm = this.formBuilder.group({
      parentAtt: [ this.depentDataConfig.parentAtt, [ Validators.required ] ],
      parentValue:[this.depentDataConfig.parentValue ,[ Validators.required,Validators.maxLength(200) ]],
      childAtt: [ this.depentDataConfig.childAtt, [ Validators.required ] ],
      childDataType: [ this.depentDataConfig.childDataType, [ Validators.required ] ],
      childValue: [ this.depentDataConfig.childValue,[ Validators.required ,Validators.maxLength(4000)]],
      childDataSource: [ this.depentDataConfig.childDataSource,[ Validators.required ,Validators.maxLength(150)]],
      parentType: [ this.depentDataConfig.parentType, [ Validators.required ]],
      workLocationId:[ this.depentDataConfig.workLocation]
    });

    this.isDisabled();

    this.customerCustomConfigService.getCustomerCustomAttributes().subscribe((res) => {
      this.customerCustomConfigData = res;
      this.customerCustomConfigData.forEach(element => {
        if (element['status'] = true) {
          element['enable'] = 'Enabled';
        } else {
          element['enable'] = 'Disabled';
        }
      });
    });

    this.locationService.getLocation().
    subscribe(res => {
      this.workLocations = res;
      console.log(this.workLocations);
    });

    if (this.id > 0)
    {
      this.heading.title = "Update Customer Dependent Data Config" ;
      this.heading.button = "Update";

      this.dependentdataconfigService.getCustomerDependentData(this.id).
      subscribe(res => {
         this.existingDependentData = res;

         this.CustomerDependentForm.controls['parentAtt'].setValue(this.existingDependentData.parentAtt);
         this.CustomerDependentForm.controls['parentValue'].setValue(this.existingDependentData.parentValue);
         this.CustomerDependentForm.controls['childAtt'].setValue(this.existingDependentData.childAtt);
         this.CustomerDependentForm.controls['childDataType'].setValue(this.existingDependentData.childValueType);
         this.CustomerDependentForm.controls['childValue'].setValue(this.existingDependentData.childValue);
         this.CustomerDependentForm.controls['childDataSource'].setValue(this.existingDependentData.childDataSource);
         if(this.existingDependentData.dependentType == true){
          this.CustomerDependentForm.controls['parentType'].setValue("Main");
         }else{this.CustomerDependentForm.controls['parentType'].setValue("Sub");}
         this.CustomerDependentForm.controls['workLocationId'].setValue(this.existingDependentData.workLocationId);
         this.isDisabled();
      });
    } 

  }

  isDisabled() {
    if(this.CustomerDependentForm.value.childDataType =='TEXT') {
      this.CustomerDependentForm.controls['childValue'].enable();
      this.CustomerDependentForm.controls['childDataSource'].disable();
      this.CustomerDependentForm.controls['childDataSource'].setValue(null);
    } else {
      this.CustomerDependentForm.controls['childValue'].disable();
      this.CustomerDependentForm.controls['childDataSource'].enable();
      this.CustomerDependentForm.controls['childValue'].setValue(null);
     }
   }

  onSubmit() {
		this.submitted = true;
		// stop the process here if form is invalid
		if (this.CustomerDependentForm.invalid) {
			return;
		}
    let dependentDataConfigPayLoad = this.CustomerDependentForm.value;
    console.log("submit", this.CustomerDependentForm.value, "-----",dependentDataConfigPayLoad);
    dependentDataConfigPayLoad["module"] = "CUSTOMER";
    if(dependentDataConfigPayLoad["parentType"] == "Main"){
      dependentDataConfigPayLoad["dependentType"] = true;
    }else{dependentDataConfigPayLoad["dependentType"] = false;}
    if(dependentDataConfigPayLoad["childDataType"] == "TEXT"){
      dependentDataConfigPayLoad["childValueType"] = "TEXT";
    }else{dependentDataConfigPayLoad["childValueType"] = "Data Source";}

    if(this.id >0){
      dependentDataConfigPayLoad["id"] = this.id;
      this.dependentdataconfigService.updateCustomerDependentData(dependentDataConfigPayLoad)
      .subscribe((res) => {
        alert(res.message);
        this.router.navigate(['/admin/dependent-data']); 
      });
    }
    else{
      this.dependentdataconfigService.saveCustomerDependentData(dependentDataConfigPayLoad)
      .subscribe((res) => {
        alert(res.message);
        this.router.navigate(['/admin/dependent-data']); 
      });
    }
  }

}
