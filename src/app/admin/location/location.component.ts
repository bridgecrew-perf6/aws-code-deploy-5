import { Component, OnInit } from '@angular/core';
import { Location } from '../../model/location';
import { LocationService } from '../../services/location.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InternationalizationService } from 'src/app/services/internationalization.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor(private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private internationalizationService: InternationalizationService) { }

  labels: any = this.internationalizationService.englishLabels['location.list'];
  userObj = {};
  locationsGridData: Location[] = [];
  locationsTempData: Location[] = [];
  locationData: any = [];
  cols: any[] = [];
  //heading :String = "Locations"
  // rowSelection: boolean = true;
  deleteBtn: boolean = false;
  editBtn: boolean = false;

  selectionChanged(data: any) {
    console.log(data);
    this.router.navigate(['/admin/location-detail/' + data.id], { state: data });
  }

  editClicked(data: any) {
    console.log(data);
    this.router.navigate(['/admin/location-detail/' + data.id], { state: data });
  }

  deleteClicked(data: any) {
    console.log(data);
    if (confirm("Are you sure want to delete the location! ")) {
      this.locationService.deleteLocation(data).
        subscribe(res => {
          alert(res.message);
          window.location.reload();
        });
    }
  }

  // selectedRows(data:any)
  // {
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

    	// Load the Page labels
		if (this.userObj['usrLangPref'] !== 'English') {
			var internationalization = sessionStorage.getItem('internationalization');
			var internationalizationObj = JSON.parse(internationalization);
			this.labels = internationalizationObj['location.list'];
      console.log('lables ', this.labels);
    }

    //check permission for Delete Location
    if (this.hasPermission('disable.location')) {
      this.deleteBtn = true;
    }

    //check permission for Edit Location
    if (this.hasPermission('update.location')) {
      this.editBtn = true;
    }

    this.cols = [
      { field: 'slNo', header: this.labels['location.list.grid.column1'], link: false },
      { field: 'name', header: this.labels['location.list.grid.column2'], link: true },
      { field: 'type', header: this.labels['location.list.grid.column3'], link: false },
      { field: 'parentLocation', header: this.labels['location.list.grid.column4'], link: false }
      // { field: 'created', header: 'Created', link: false },
      // { field: 'action', header: 'Action', link: false }
    ];

    this.locationService.getLocation().
      subscribe(res => {
        this.locationData = res;
        console.log(this.locationData);
        let locationData = [];
        for (var i = 0; i < this.locationData.length; i++) {
          let location = new Location();
          location.id = this.locationData[i].id;
          location.orgId = this.locationData[i].orgId;
          location.parentId = this.locationData[i].parentId;
          location.slNo = i + 1;
          location.name = this.locationData[i].name;
          location.type = this.locationData[i].type;
          location.parentLocation = this.locationData[i].parentName;
          // location.created = this.locationData[i].created;
          this.locationsTempData.push(location);
        }
        this.locationsGridData = this.locationsTempData;
        this.cd.detectChanges();
      });
  }
}