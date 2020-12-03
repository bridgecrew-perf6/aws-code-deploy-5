import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import { Skill } from '../../model/skill';
import { Router, ActivatedRoute} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { InternationalizationService } from 'src/app/services/internationalization.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  constructor(private skillService : SkillService,
    private router:Router,
    private internationalizationService: InternationalizationService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef) { }

  skillData:any = {};
  userObj = {};
  cols: any[] = [];
  skills: Skill[] = [];
  skilltemp: Skill[] = [];
  deleteBtn: boolean = false;
  editBtn: boolean = false;
  labels:any =this.internationalizationService.englishLabels['skill.list'];
  heading :String;


  selectionChanged(data:any)
  {
    console.log(data);
    this.router.navigate(['/admin/skill-detail/'+data.id], {state:data});
  }

  editClicked(data:any)
  {
    console.log(data);
    this.router.navigate(['/admin/skill-detail/'+data.id], {state:data});
  }

  deleteClicked(data:any)
  {
    console.log(data);
    if(confirm(this.labels['skill.list.grid.delete'])) {
      this.skillService.deleteSkill(data).
      subscribe(res => {
        alert(res.message);
        window.location.reload();
      });
    }
  }

  public hasPermission(key:String)
  {
    
    if(this.userObj["permissions"].indexOf(key) > -1)
    {
      return true;
    }
    else
    {
      return false;
    }

  }
  
  ngOnInit(): void {

    var session = sessionStorage.getItem('userDetails');
    this.userObj = JSON.parse(session);
    console.log('UserComponent',this.userObj);
    // Load the Page labels
		if (this.userObj['usrLangPref'] !== 'English') {
    var internationalization = sessionStorage.getItem('internationalization');
    var internationalizationObj = JSON.parse(internationalization);
    this.labels = internationalizationObj['skill.list'];
    }
    this.heading = this.labels['skill.list.main.heading'];

    //check permission for Delete Skill
    if(this.hasPermission('disable.skill')){
     this.deleteBtn = true;
    }

     //check permission for Edit Skill
     if(this.hasPermission('update.skill')){
      this.editBtn = true;
     }
 
    this.skillService.getSkill().
    subscribe(res => {
      this.skillData = res;  
      let skill;  
      for(var i=0; i < this.skillData.length; i++) {
        skill = new Skill();
        skill.id = this.skillData[i].id;
        skill.slNo = i+1;
        skill.name =  this.skillData[i].name;
        skill.description =  this.skillData[i].description;
        skill.orgId =  this.skillData[i].orgId;
        skill.parentId = this.skillData[i].parentId;
        this.skilltemp.push(skill);
      }
      this.skills = this.skilltemp;
      this.cd.detectChanges();
    });

    this.cols = [
      { field: 'slNo', header: this.labels['skill.list.grid.column1'], link:false },
      { field: 'name', header: this.labels['skill.list.grid.column2'], link:true },
      { field: 'description', header: this.labels['skill.list.grid.column3'], link:false }
    ];

  }
}


