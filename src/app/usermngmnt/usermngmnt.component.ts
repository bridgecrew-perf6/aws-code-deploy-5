import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usermngmnt',
  templateUrl: './usermngmnt.component.html',
  styleUrls: ['./usermngmnt.component.css']
})
export class UsermngmntComponent implements OnInit {

  collapseLeftPanel:any;
  public leftPanelCollapsed: boolean;
  public isLoading: boolean;

  ngOnInit(): void {

  }

}
