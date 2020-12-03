import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  displayName:String;
  displayEmail:String;
  sessionObj:any;
  ngOnInit() {
  }
  
  loadSettingsPage()
  {

  }

  logout()
  {
    sessionStorage.clear();
    window.location.href='/auth';
  }
  

}
