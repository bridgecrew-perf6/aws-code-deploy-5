import { Component, OnInit } from '@angular/core';
import { Car } from '../../model/car';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css']
})
export class DatagridComponent implements OnInit {

  constructor() { }
  cars: Car[] = [];
  cols: any[] = [];
  
  selectionChanged(data:any)
  {
    console.log("Inside DatagridComponent");
    console.log(data);
  }
  ngOnInit(): void {
    this.cols = [
      { field: 'vin', header: 'Model', link:true },
      { field: 'year', header: 'Year', link:false },
      { field: 'brand', header: 'Brand', link:false },
      { field: 'color', header: 'Color', link:false }
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
    car = new Car();
    car.id = "2023";
    car.year = "123";
    car.brand = "123";
    car.color = "123";
    this.cars.push(car);
    car = new Car();
    car.id = "2024";
    car.year = "123";
    car.brand = "123";
    car.color = "123";
    this.cars.push(car);
  }

}
