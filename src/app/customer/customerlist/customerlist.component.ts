import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
		private router: Router,
    private cd: ChangeDetectorRef,
    private locationService: LocationService) { }

   workLocations: any = [];
   customerlistForm: FormGroup;
   editBtn: boolean = true;
   cols: any[] = [];
   customers: any[] = [];
   customerstemp: any[] = [];

   selectionChanged(data:any)
   {
     console.log(data);
     this.router.navigate(['/customer/customer-detail/'+data.id], {state:data});
   }
 
   editClicked(data:any)
   {
     console.log(data);
     this.router.navigate(['/customer/customer-detail/'+data.id], {state:data});
   }

  ngOnInit(): void {

    this.customerlistForm = this.formBuilder.group({
      workLocationId:[''],
      customerName:[''],
      customerId:['']
    });

    this.locationService.getLocation().
      subscribe(res => {
        this.workLocations = res;
        console.log(this.workLocations);
      });

      this.cols = [
        { field: 'slNo', header: "SL No", link:false },
        { field: 'name', header: "Name", link:true },
        { field: 'customerId', header: "Customer Id", link:false },
        { field: 'email', header: "Email", link:false },
        { field: 'phoneno', header: "Phone Number", link:false }
      ];
  

  }

}
