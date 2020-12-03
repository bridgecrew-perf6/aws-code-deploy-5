import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor() { }

  collapseLeftPanel:any;
  public leftPanelCollapsed: boolean;
  public isLoading: boolean;

  ngOnInit(): void {
  }

}
