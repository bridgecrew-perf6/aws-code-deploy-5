import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }
  public leftPanelCollapsed: boolean;
  isLoading: boolean;
  ngOnInit() {
  }

  collapseLeftPanel(stat:boolean)
  {}

}
