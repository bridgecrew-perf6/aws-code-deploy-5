import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datetimepick',
  templateUrl: './datetimepick.component.html',
  styleUrls: ['./datetimepick.component.css']
})
export class DatetimepickComponent implements OnInit {


  currentDate = { year: 2020, month: 2, day: 26 };

  constructor() {    

  }

  ngOnInit() {  
  }

  dateChange :any = {};
  selDateChanged(event)
  {
    this.dateChange = event;
  }
  
  dateTimeChange :any = {};
  selDateTimeChanged(event)
  {
    console.log(event);
    this.dateTimeChange = event;
  }

  dateRangeChange :any = {};
  selDateRangeChanged(event)
  {
    console.log(event);
    this.dateRangeChange = event;
  }
}
