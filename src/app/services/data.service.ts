import { Injectable } from '@angular/core';
import { Salary } from '../model/salary';
import { Settings } from '../model/settings';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getSalary():Salary[]  {
    let salaries :Salary[] = [];
    let salary = new Salary( 100,'Anil Kumar','LOP','02/01/2020','Confirmed','Manager',
    600000, 50000, 0, 0, 118000, 0.0,0.0,
    0.0, 0.0, 0.0, 0.0, 50000, 18000, 50000, 25000, 25000, 0.0, 0.0, 0.0, 0.0,
    96000, 8000, 0,0.0, 0.0, 0.0);
    salaries.push(salary);
    salary = new Salary( 101,'Ram Kumar','LOP','02/01/2020','Confirmed','Manager',
    600000, 50000, 0, 0, 118000, 0.0,0.0,
    0.0, 0.0, 0.0, 0.0, 50000, 18000, 50000, 25000, 25000, 0.0, 0.0, 0.0, 0.0,
    96000, 8000, 0,0.0, 0.0, 0.0);
    salaries.push(salary);
    salary = new Salary( 102,'Sam Alex','LOP','02/01/2020','Confirmed','Manager',
    600000, 50000, 0, 0, 118000, 0.0,0.0,
    0.0, 0.0, 0.0, 0.0, 50000, 18000, 50000, 25000, 25000, 0.0, 0.0, 0.0, 0.0,
    96000, 8000, 0,0.0, 0.0, 0.0);
    salaries.push(salary);
    return salaries;
  }
  getSettings():Settings {
    let settings = new Settings( 
    1750, 500, 40, 20, 40, 200, 100 );
    return settings;
  }
}
