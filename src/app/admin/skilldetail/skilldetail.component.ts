import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { InternationalizationService } from 'src/app/services/internationalization.service';

@Component({
  selector: 'app-skilldetail',
  templateUrl: './skilldetail.component.html',
  styleUrls: ['./skilldetail.component.css']
})
export class SkilldetailComponent implements OnInit {
  intLabels: any = this.internationalizationService.englishLabels['skill.details'];
  id: number;
  skillForm: FormGroup;
  submitted = false;
  skillObj:any={};
  skillData:any = {};
  userObj = {};
  heading={
    title:this.intLabels['skill.details.main.heading.add'],
    button:this.intLabels['skill.details.main.button.save']
  };


  constructor(private skillService:SkillService,
    private formBuilder: FormBuilder,
    private router:Router,
    private internationalizationService: InternationalizationService,
    private route: ActivatedRoute) { }


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
    //Load Page Lables
    if (this.userObj['usrLangPref'] !== 'English') {
      var internationalization = sessionStorage.getItem('internationalization');
      var internationalizationObj = JSON.parse(internationalization);
      this.intLabels = internationalizationObj['skill.details'];
    }
    this.heading.title = this.intLabels['skill.details.main.heading.add'];
    this.heading.button =this.intLabels['skill.details.main.button.save'];
    
    this.id = this.route.snapshot.params['id'];

    this.skillForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      parentId :['']
    });

    if (this.id > 0)
    {
      this.heading.title = this.intLabels['skill.details.main.heading.update'];
      this.heading.button = this.intLabels['skill.details.main.button.update'];

      this.skillService.getSkillDetail(this.id).
      subscribe(res => {
        this.skillObj = res;  
      });
    }

    this.skillService.getParentSkill().
    subscribe(res => {
      this.skillData = res;  
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop the process here if form is invalid
    if (this.skillForm.invalid) {
        return;
    }else{
      if(this.id>0){
        this.skillService.updateSkill(this.skillObj)
        .subscribe((res) => {
          alert(res.message);
          this.router.navigate(['/admin/skill']); 
        });
      }else{
        this.skillService.saveSkill(this.skillObj)
        .subscribe((res) => {
          alert(res.message);
          this.router.navigate(['/admin/skill']); 
        });
      }
    }
  }

}
