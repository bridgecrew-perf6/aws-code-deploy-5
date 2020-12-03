import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sublocation } from '../../model/sublocation';
import { ChangeDetectorRef } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { Location } from '../../model/location';
import { LocationService } from '../../services/location.service';
import { SubLocationService } from 'src/app/services/sub-location.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InternationalizationService } from 'src/app/services/internationalization.service';

@Component({
  selector: 'app-locationdetail',
  templateUrl: './locationdetail.component.html',
  styleUrls: ['./locationdetail.component.css']
})
export class LocationdetailComponent implements OnInit {
  intLabels: any = this.internationalizationService.englishLabels['location.details'];
  intSubLabels: any = this.internationalizationService.englishLabels['sub.location.list'];
  id: number;
  locationId: number;
  locationDetailForm: FormGroup;
  submitted = false;
  subLocations: Sublocation[] = [];
  cols: any[] = [
    { field: 'name', header: this.intSubLabels['sub.location.list.grid.column1'], link: true },
    { field: 'description', header: this.intSubLabels['sub.location.list.grid.column2'], link: false }
  ];
  rowSelection: boolean = true;
  deleteBtn: boolean = false;
  editBtn: boolean = false;
  location: Location;
  countries: String[] = [];
  parentLocations: any = [];
  userObj = {};
  orgLocationData: any = [];
  responseObject: any = {};
  existingLocationDetails: any;
  heading = {
    title:this.intLabels['location.details.main.heading.add'],
    button:this.intLabels['location.details.main.button.save']
  };
  subLocationData: any = [];
  subLocationsGridData: Sublocation[] = [];
  subLocationsTempData: Sublocation[] = [];
  
  constructor(private formBuilder: FormBuilder,
    private locationService: LocationService,
    private subLocationService: SubLocationService,
    private countryService: CountryService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private internationalizationService: InternationalizationService) { }

  selectionChanged(data: any) {
    console.log(data);
    this.router.navigate(['/admin/sublocation-detail/' + data.locationId + '/' + data.id], { state: data });
  }

  editClicked(data: any) {
    console.log('Edit Call', data);
    this.router.navigate(['/admin/sublocation-detail/' + data.locationId + '/' + data.id], { state: data });
  }

  deleteClicked(data: any) {
    console.log(data);
    if (confirm("Are you sure want to delete the sub location! ")) {
      this.subLocationService.deleteSubLocation(data).
        subscribe(res => {
          alert(res.message);
          window.location.reload();
        });
    }
  }

  OnSubLocationDetailsSubmit() {
    console.log('calling OnSubLocationDetailsSubmit', this.id);
    this.router.navigate(['/admin/sublocation-detail/' + this.id + '/0']);
  }

  // selectedRows(data: any) {
  //   alert("SelectedRows Clicked");
  //   console.log("selectedRows Clicked");
  //   console.log(data);
  // }

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
      this.intLabels = internationalizationObj['location.details'];
      console.log('intLabels:', this.intLabels);
      this.intSubLabels = internationalizationObj['sub.location.list'];
      console.log('SubLabels:', this.intSubLabels);
      this.heading = {
        title:this.intLabels['location.details.main.heading.add'],
        button:this.intLabels['location.details.main.button.save']
      };
      this.cols = [
        { field: 'name', header: this.intSubLabels['sub.location.list.grid.column1'], link: true },
        { field: 'description', header: this.intSubLabels['sub.location.list.grid.column2'], link: false }
      ];
    }


    //check permission for Delete Location
    if (this.hasPermission('disable.sub.location')) {
      this.deleteBtn = true;
    }

    //check permission for Edit Location
    if (this.hasPermission('update.sub.location')) {
      this.editBtn = true;
    }

    this.location = new Location();
    this.location.type = 'Location';
    this.id = this.route.snapshot.params['id'];
    console.log('this.id', this.id);
    this.countries = this.countryService.getCountryNamesArray();
    this.parentLocations = this.locationService.getParentLocation().
      subscribe(res => {
        console.log('parent locations', res);
        this.orgLocationData = res;
      });

    this.locationDetailForm = this.formBuilder.group({
      id: 0,
      name: [this.location.name, Validators.required],
      type: [this.location.type, Validators.required],
      businessAddress: [this.location.businessAddress],
      communicationAddress: [this.location.communicationAddress],
      country: [this.location.country],
      state: this.location.state,
      city: [this.location.city],
      zipCode: this.location.zipCode,
      phone: [this.location.phone],
      alternatePhone: [this.location.alternatePhone],
      email: [this.location.email, Validators.email],
      contactName: [this.location.contactName],
      contactPhone: [this.location.contactPhone],
      contactEmail: [this.location.contactEmail, Validators.email],
      parentId: [this.location.parentId]
    });
    this.cd.detectChanges();

    if (this.id > 0) {
      this.heading.title =this.intLabels['location.details.main.heading.update'];
      this.heading.button =this.intLabels['location.details.main.button.update'];

      this.locationService.getLocationDetails(this.id).
        subscribe(res => {
          this.existingLocationDetails = res;
          console.log('Existing Location Detail', this.existingLocationDetails);
          this.location = this.existingLocationDetails;
          console.log("Existing locationName: " + this.location.name);
          this.locationDetailForm.controls['id'].setValue(this.location.id);
          this.locationDetailForm.controls['name'].setValue(this.location.name);
          this.locationDetailForm.controls['type'].setValue(this.location.type);
          this.locationDetailForm.controls['businessAddress'].setValue(this.location.businessAddress);
          this.locationDetailForm.controls['communicationAddress'].setValue(this.location.communicationAddress);
          this.locationDetailForm.controls['country'].setValue(this.location.country);
          this.locationDetailForm.controls['state'].setValue(this.location.state);
          this.locationDetailForm.controls['city'].setValue(this.location.city);
          this.locationDetailForm.controls['zipCode'].setValue(this.location.zipCode);
          this.locationDetailForm.controls['phone'].setValue(this.location.phone);
          this.locationDetailForm.controls['alternatePhone'].setValue(this.location.alternatePhone);
          this.locationDetailForm.controls['email'].setValue(this.location.email);
          this.locationDetailForm.controls['contactName'].setValue(this.location.contactName);
          this.locationDetailForm.controls['contactPhone'].setValue(this.location.contactPhone);
          this.locationDetailForm.controls['contactEmail'].setValue(this.location.contactEmail);
          this.locationDetailForm.controls['parentId'].setValue(this.location.parentId);
        });
      console.log('Update form ', this.locationDetailForm);

      console.log('locationId -->', this.id);
      this.subLocationService.getSubLocations(this.id).
        subscribe(res => {
          this.subLocationData = res;
          console.log('sublocationData--> ',this.subLocationData);
          let subLocationData = [];
          for (var i = 0; i < this.subLocationData.length; i++) {
            let subLocation = new Sublocation();
            subLocation.id = this.subLocationData[i].id;
            subLocation.orgId = this.subLocationData[i].orgId;
            subLocation.locationId = this.subLocationData[i].locationId;
            subLocation.name = this.subLocationData[i].name;
            subLocation.description = this.subLocationData[i].description;
            console.log('subLocation --> ',subLocation)
            this.subLocationsTempData.push(subLocation);
          }
          this.subLocationsGridData = this.subLocationsTempData;
          this.cd.detectChanges();
        });
    }
  }

  onSubmit() {
    console.log('Onsubmit called loc');
    this.submitted = true;
    // stop the process here if form is invalid
    if (this.locationDetailForm.invalid) {
      return;
    } else {
      console.log('Onsubmit called loc1');
      if (this.id > 0) {
        console.log('Update Payload ', this.locationDetailForm.value);
        this.locationService.updateLocation(this.locationDetailForm.value)
          .subscribe((res) => {
            console.log(res);
            this.router.navigate(['/admin/location']);
            this.responseObject = res;
            alert(this.responseObject.message);
          });
      } else {
        console.log("Payload ", this.locationDetailForm.value);
        let payload = this.locationDetailForm.value;
        this.locationService.saveLocation(payload)
          .subscribe((res) => {
            console.log(res);
            this.router.navigate(['/admin/location']);
            this.responseObject = res;
            alert(this.responseObject.message);
          });
      }
    }
  }
}