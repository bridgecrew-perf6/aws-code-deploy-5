import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sublocation } from '../../model/sublocation';
import { SubLocationService } from 'src/app/services/sub-location.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { InternationalizationService } from 'src/app/services/internationalization.service';

@Component({
  selector: 'app-sublocationdetail',
  templateUrl: './sublocationdetail.component.html',
  styleUrls: ['./sublocationdetail.component.css']
})
export class SublocationdetailComponent implements OnInit {
  intLabels: any = this.internationalizationService.englishLabels['sub.location.details'];
  id: number;
  locationId: number;
  subLocation: Sublocation;
  subLocationDetailForm: FormGroup;
  submitted = false;
  countries: String[] = [];
  userObj = {};
  responseObject: any = {};
  existingSubLocationDetails: any;
  heading = {
    title: this.intLabels['sub.location.details.main.heading.add'],
    button: this.intLabels['sub.location.details.main.button.save']
  };

  constructor(private formBuilder: FormBuilder,
    private subLocationService: SubLocationService,
    private countryService: CountryService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private internationalizationService: InternationalizationService) { }

  public hasPermission(key: String) {
    if (this.userObj["permissions"].indexOf(key) > -1) {
      return true;
    }
    else {
      return false;
    }
  }

  ngOnInit(): void {
    var session = sessionStorage.getItem('userDetails');
    this.userObj = JSON.parse(session);
    console.log('UserComponent', this.userObj);
       //Load Page Lables
       if (this.userObj['usrLangPref'] !== 'English') {
        var internationalization = sessionStorage.getItem('internationalization');
        var internationalizationObj = JSON.parse(internationalization);
        this.intLabels = internationalizationObj['sub.location.details'];
        this.heading = {
          title: this.intLabels['sub.location.details.main.heading.add'],
          button: this.intLabels['sub.location.details.main.button.save']
        };
      }

    this.subLocation = new Sublocation();
    this.subLocation.type = 'Location';
    this.locationId = this.route.snapshot.params['id'];
    this.id = this.route.snapshot.params['subId'];
    console.log('this.id', this.id);
    this.countries = this.countryService.getCountryNamesArray();
    this.subLocationDetailForm = this.formBuilder.group({
      id: 0,
      name: [this.subLocation.name, Validators.required],
      type: [this.subLocation.type, Validators.required],
      description: [this.subLocation.description, Validators.maxLength(1000)],
      businessAddress: [this.subLocation.businessAddress, Validators.maxLength(1000)],
      communicationAddress: [this.subLocation.communicationAddress, Validators.maxLength(1000)],
      country: [this.subLocation.country],
      state: this.subLocation.state,
      city: [this.subLocation.city],
      zipCode: this.subLocation.zipCode,
      phone: [this.subLocation.phone],
      alternatePhone: [this.subLocation.alternatePhone],
      email: [this.subLocation.email],
      contactName: [this.subLocation.contactName],
      contactPhone: [this.subLocation.contactPhone],
      contactEmail: [this.subLocation.contactEmail],
      locationId: [this.subLocation.locationId]
    });

    if (this.id > 0) {
      console.log('this.id --> ', this.id);
      this.heading.title = this.intLabels['sub.location.details.main.heading.update'];
      this.heading.button = this.intLabels['sub.location.details.main.button.update'];

      this.subLocationService.getSubLocationDetails(this.id).
        subscribe(res => {
          this.existingSubLocationDetails = res;
          console.log('Existing Sub Location Detail', this.existingSubLocationDetails);
          this.subLocation = this.existingSubLocationDetails;
          console.log("Existing locationName: " + this.subLocation.name);
          this.subLocationDetailForm.controls['id'].setValue(this.subLocation.id);
          this.subLocationDetailForm.controls['name'].setValue(this.subLocation.name);
          this.subLocationDetailForm.controls['type'].setValue(this.subLocation.type);
          this.subLocationDetailForm.controls['description'].setValue(this.subLocation.description);
          this.subLocationDetailForm.controls['businessAddress'].setValue(this.subLocation.businessAddress);
          this.subLocationDetailForm.controls['communicationAddress'].setValue(this.subLocation.communicationAddress);
          this.subLocationDetailForm.controls['country'].setValue(this.subLocation.country);
          this.subLocationDetailForm.controls['state'].setValue(this.subLocation.state);
          this.subLocationDetailForm.controls['city'].setValue(this.subLocation.city);
          this.subLocationDetailForm.controls['zipCode'].setValue(this.subLocation.zipCode);
          this.subLocationDetailForm.controls['phone'].setValue(this.subLocation.phone);
          this.subLocationDetailForm.controls['alternatePhone'].setValue(this.subLocation.alternatePhone);
          this.subLocationDetailForm.controls['email'].setValue(this.subLocation.email);
          this.subLocationDetailForm.controls['contactName'].setValue(this.subLocation.contactName);
          this.subLocationDetailForm.controls['contactPhone'].setValue(this.subLocation.contactPhone);
          this.subLocationDetailForm.controls['contactEmail'].setValue(this.subLocation.contactEmail);
          this.subLocationDetailForm.controls['locationId'].setValue(this.subLocation.locationId);
        });
      console.log('Update form ', this.subLocationDetailForm);
    }
  }

  onSubmit() {
    console.log('Onsubmit called loc');
    this.submitted = true;
    // stop the process here if form is invalid
    if (this.subLocationDetailForm.invalid) {
      return;
    } else {
      console.log('Onsubmit called loc1');
      let payload = this.subLocationDetailForm.value;
      console.log(' payload.locationId -->', payload.locationId);
      if (this.id > 0) {
        console.log('Update Payload ', this.subLocationDetailForm.value);
        this.subLocationService.updateSubLocation(payload)
          .subscribe((res) => {
            console.log(res);
            this.router.navigate(['/admin/location-detail/' + payload.locationId]);
            this.responseObject = res;
            alert(this.responseObject.message);
          });
      } else {
        console.log("Payload--> ", this.subLocationDetailForm.value);
        payload['locationId'] = this.locationId;
        this.subLocationService.saveSubLocation(payload)
          .subscribe((res) => {
            console.log(res);
            this.router.navigate(['/admin/location-detail/' + payload.locationId]);
            this.responseObject = res;
            alert(this.responseObject.message);
          });
      }
    }
  }
}