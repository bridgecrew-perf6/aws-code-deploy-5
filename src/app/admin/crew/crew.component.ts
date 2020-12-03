import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { OrgService } from '../../services/org.service';
import { SlicePipe } from '@angular/common';
import { CrewdetailsComponent } from '../crewdetails/crewdetails.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Crew } from 'src/app/model/crew';
import { CrewService } from 'src/app/services/crew.service';


@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.css']
})
export class CrewComponent implements OnInit {

  constructor( private crewService : CrewService,
    private route: ActivatedRoute,
    private router: Router, 
    private cd : ChangeDetectorRef
  ) { }

  deleteBtn: boolean = true;
  editBtn: boolean = true;

  crewColumns = [
    { field: 'slNo', header: 'Sl.No', link: false },
    { field: 'name', header: 'Name', link: true },
    
  ];

  crews: any = [];
  crewData:Crew[]=[];
  crewTemp:Crew[]=[]; 
  responseObject: any = {};
  
  addCrew()
  {
    console.log("button Clicked");
    this.router.navigate([ '/admin/crew-details/0' ]);
  }


  selectionChanged(data:any)
  {
    this.router.navigate([ '/admin/crew-details/' + data['id'] ]);
  }

  editClicked(data:any)
  {
    this.router.navigate([ '/admin/crew-details/' + data['id'] ]);
  }

  deleteClicked(data:any)
  {
  
     //console.log("Delete Clicked");
     console.log(data);
     if(confirm("you want to delete this crew")) {
       this.crewService.deleteCrew(data).
       subscribe(res => {
        this.responseObject = res;
				alert(this.responseObject.message);
       window.location.reload();
       });
   }
  }


  selectedRows(data:any)
  {
    alert("SelectedRows Clicked");
    console.log("selectedRows Clicked");
    console.log(data);
  }


  ngOnInit(): void {
    console.log('crew Information called');
    this.crewService.getCrew(). 
       subscribe(res => {
      this.crews = res;  
      let crew;  
      for(var i=0; i < this.crews.length; i++) {
        crew = new Crew();
        crew.id = this.crews[i].id;
        crew.slNo = i+1;
        crew.name =  this.crews[i].crewName;
        crew.orgId =  this.crews[i].orgId;
        
        this.crewTemp.push(crew);
      }
      this.crewData = this.crewTemp;
      this.cd.detectChanges();
    });

    }
    

    

}
