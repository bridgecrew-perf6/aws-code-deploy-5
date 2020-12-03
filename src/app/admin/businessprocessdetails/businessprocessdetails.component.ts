import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessProcess } from 'src/app/model/businessProcess';
import { BusinessProcessService } from "../../services/business-process.service";
import { InternationalizationService } from 'src/app/services/internationalization.service';


@Component({
  selector: 'app-businessprocessdetails',
  templateUrl: './businessprocessdetails.component.html',
  styleUrls: ['./businessprocessdetails.component.css']
})
export class BusinessprocessdetailsComponent implements OnInit {
  id: number;
  bpId: number;
  businessProcess: BusinessProcess;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private businessProcessService: BusinessProcessService,
    private route: ActivatedRoute,
    private internationalizationService: InternationalizationService) { }
  registerForm: FormGroup;
  submitted = false;
  existingBpDetails: any;

  intLabels: any = this.internationalizationService.englishLabels['bp.details'];
  labels: any = {
    title: this.intLabels['bp.details.main.heading.add'],
    button: this.intLabels['bp.details.main.button.save']
  };

  ngOnInit(): void {

    this.bpId = this.route.snapshot.params['bpId'];
    console.log("Bp Id-->" + this.bpId);

    this.businessProcess = new BusinessProcess();
    this.businessProcess.locationMandatory = false;
    this.registerForm = this.formBuilder.group({
      id: 0,
      name: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      part: false,
      partLabel: ['',],
      displayOrder: ['',],
      autoSchedule: false,
      locationMandatory: false,
      duration: ['',],
      imageUrl: ['',],
      attachments: false,
      maxAttachments: ['',],
      autoClose: false,
      autoCloseDays: ['',],
      autoArchive: false,
      autoArchiveDay: ['',]
    });

    // Getting the userID from the route
    // If UserID == 0 then new org creation if UserID > 0 then user should get update
    this.id = this.route.snapshot.params['bpId'];
    this.bpId = this.id;
    //Get exis BP and map data
    if (this.id > 0) {
      //Chnaging Lables 
      this.labels.title = this.intLabels['bp.details.main.heading.update'];
      this.labels.button = this.intLabels['bp.details.main.button.update'];
      // Getting the existing Business Process Details on Id base
      this.businessProcessService.getBusinessProcessById(this.id).subscribe(response => {
        this.existingBpDetails = response;
        console.log("In edit Bp Name " + this.existingBpDetails.name);
        this.registerForm.controls['id'].setValue(this.existingBpDetails.id);
        this.registerForm.controls['name'].setValue(this.existingBpDetails.name);
        this.registerForm.controls['status'].setValue(this.existingBpDetails.status);
        this.registerForm.controls['description'].setValue(this.existingBpDetails.description);
        this.registerForm.controls['part'].setValue(this.existingBpDetails.part);
        this.registerForm.controls['partLabel'].setValue(this.existingBpDetails.partLabel);
        this.registerForm.controls['displayOrder'].setValue(this.existingBpDetails.displayOrder);
        this.registerForm.controls['autoSchedule'].setValue(this.existingBpDetails.autoSchedule);
        this.registerForm.controls['locationMandatory'].setValue(this.existingBpDetails.locationMandatory);
        this.registerForm.controls['duration'].setValue(this.existingBpDetails.duration);
        this.registerForm.controls['imageUrl'].setValue(this.existingBpDetails.imageUrl);
        this.registerForm.controls['attachments'].setValue(this.existingBpDetails.attachments);
        this.registerForm.controls['maxAttachments'].setValue(this.existingBpDetails.maxAttachments);
        this.registerForm.controls['autoClose'].setValue(this.existingBpDetails.autoClose);
        this.registerForm.controls['autoCloseDays'].setValue(this.existingBpDetails.autoCloseDays);
        this.registerForm.controls['autoArchive'].setValue(this.existingBpDetails.autoArchive);
        this.registerForm.controls['autoArchiveDay'].setValue(this.existingBpDetails.autoArchiveDay);
      });
    }

  }
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    console.log("Add Business Process Data " + this.registerForm);

    if (this.id > 0) {
      this.businessProcessService.updateBusinessProcess(this.registerForm.value)
        .subscribe((res) => {
          this.router.navigate(['/admin/business-process']);
        });
    } else {
      this.businessProcessService.createBusinessProcess(this.registerForm.value).subscribe
        ((res) => {
          this.router.navigate(['/admin/business-process']);
        });
    }
  }

  configTicketAttributes() {
    console.log("Inside configTicketAttributes");
    this.router.navigate(['/admin/ticket-custom-config/' + this.bpId]);
    console.log("Inside configTicketAttributes end");
  }

  configPartAttributes() {
    console.log("Inside configPartAttributes");
    this.router.navigate(['/admin/part-custom-config/' + this.bpId]);
    console.log("Inside configPartAttributes end");
  }
  redirectToTask() {
    this.router.navigate(['/admin/task/' + this.bpId]);
  }

}
