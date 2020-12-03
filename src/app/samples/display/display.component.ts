import { Component, OnInit } from '@angular/core';
import { Car } from '../../model/car';
import { OrgService } from '../../services/org.service';
declare var $: any; // ADD THIS
import * as $ from 'jquery';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(private orgService: OrgService) { }

  cars: Car[] = [];
  colSelected: Car[] = [];
  cols: any[] = [];
  orgData: any = {};
  heading: String = "Cars";
  dataKey: String = "id";
  deleteBtn: boolean = true;
  editBtn: boolean = true;
  rowSelection: boolean = true;

  selectionChanged(data: any) {
    alert("Link Clicked");
    console.log("Link Clicked");
    console.log(data);
  }

  editClicked(data: any) {
    alert("Edit Clicked");
    console.log("Edit Clicked");
    console.log(data);
  }

  deleteClicked(data: any) {
    alert("Delete Clicked");
    console.log("Delete Clicked");
    console.log(data);
  }

  selectedRows(data: any) {
    alert("SelectedRows Clicked");
    console.log("selectedRows Clicked");
    console.log(data);
  }

  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];
  selectedCityCodes: any[];
  selectedCities: any[];


  ngOnInit(): void {
    $('[data-toggle="popover"]').popover();
    this.cols = [
      { field: 'id', header: 'Model', link: true },
      { field: 'year', header: 'Year', link: false },
      { field: 'brand', header: 'Brand', link: false },
      { field: 'color', header: 'Color', link: false }
    ];

    let car = new Car();
    car.id = "2019";
    car.year = "123";
    car.brand = "123";
    car.color = "123";
    this.cars.push(car);
    car = new Car();
    car.id = "2020";
    car.year = "123";
    car.brand = "123";
    car.color = "123";
    this.cars.push(car);
    car = new Car();
    car.id = "2021";
    car.year = "123";
    car.brand = "123";
    car.color = "123";
    this.cars.push(car);
    car = new Car();
    car.id = "2022";
    car.year = "123";
    car.brand = "123";
    car.color = "123";
    this.cars.push(car);
    this.colSelected.push(car);
    car = new Car();
    car.id = "2023";
    car.year = "123";
    car.brand = "123";
    car.color = "123";
    this.cars.push(car);
    this.colSelected.push(car);
    car = new Car();
    car.id = "2024";
    car.year = "123";
    car.brand = "123";
    car.color = "123";
    this.cars.push(car);



    this.orgService.getOrg().
      subscribe(res => {
        this.orgData = res;
      });
  }
}
