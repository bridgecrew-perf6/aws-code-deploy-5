import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    //this.router.navigate(['samples']);
    if (sessionStorage.getItem("jwtToken")) {
      this.router.navigate(['admin']);
    }
    else {
      sessionStorage.clear();
      localStorage.clear();
      this.router.navigate(['auth']);
    }
    
  }

}
