import {
  Component, OnInit, EventEmitter, Output, Input, ViewChild,
  Injectable,SimpleChanges
} from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  NgbDateStruct, NgbCalendar, NgbDatepicker,
  NgbDateAdapter, NgbDateParserFormatter, NgbDate
} from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef } from '@angular/core';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  providers:[DatePipe,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }]
  
})


export class DateComponent implements OnInit {

  constructor(private datePipe: DatePipe,
    private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>,
    private cd: ChangeDetectorRef) 
  { }
  
  @Input() heading: String = "";
  @Input() currentDate: String = "";
  ngOnInit(): void {
    //this.today();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("SimpleChanges **************************");
    for (let propName in changes) {
      if(propName == "currentDate")
      {
        let chng = changes[propName];
        const cur  = JSON.stringify(chng.currentValue);
        let prev = JSON.stringify(chng.previousValue);
        let arr = cur.replace("\"","").replace("\"","").split("-");
        console.log("**" + arr[0] + "**" );
        console.log("**" + arr[1] + "**" );
        console.log("**" + arr[2] + "**" );
        console.log(chng.currentValue);
        this.setDate(Number(arr[0]), Number(arr[1]), Number(arr[2]));
      }
    }
    // console.log("SimpleChanges", changes);
    // console.log( changes["currentDate"]);
    // if(changes["currentDate"])
    // {
    //   let data:any = {};
    //   data = JSON.stringify(changes['currentDate'].currentValue);
    //   console.log(data);
    //   console.log(changes['currentDate'].currentValue);
    //   this.md = changes['currentDate'].currentValue;
    //   this.setDate(this.md.year, this.md.month, this.md.day);
    //   this.cd.detectChanges();
    // }
      
  }

  @Output() dateChange: EventEmitter<any> = new EventEmitter<any>();
  addEvent(event) {
    //this.events.push(`${type}: ${event.value}`);
    console.log(event.replaceAll('-', '/'));
    let val = event.split('-');
    if(val[1].length ==1)
      val[1] = "0"+ val[1];
    if(val[0].length ==1)
      val[0] = "0"+ val[0];
    this.dateChange.emit(val[1]+"/"+val[0]+"/"+val[2]);
    //this.dateTimeChange.emit(this.datePipe.transform(event, 'dd/MM/yyyy hh:mm:ss a'));
  }

  time = { hour: 13, minute: 30 };

  dateModel: string;
  currentDate1:any = {};
  md :any =  ModelData;

  setDate( year:Number, month : Number,  day: Number) {
    console.log("this.currentDate ********************" + year + " " + month + " " +day );
    // console.log(this.md);
    // console.log(this.md.year);
    this.md.year = year;
    this.md.month = month;
    this.md.day = day;
    this.dateModel = this.dateAdapter.toModel(this.md);
    console.log(this.dateModel );
    this.cd.detectChanges();
    // console.log(this.ngbCalendar.getToday());
    // let date = { year: 2020, month: 1, day: 26 };
    // this.model1 = this.dateAdapter.toModel(date);
    //this.model1 = this.dateAdapter.toModel(this.ngbCalendar.getToday());
    //return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

  today() {
    console.log("this.currentDate ********************");
    console.log(this.currentDate );
    console.log( this.currentDate["year"]);
    this.md.year = this.currentDate["year"];
    this.md.month = 3;
    this.md.day = 12;
    this.dateModel = this.dateAdapter.toModel(this.md);
    console.log(this.dateModel );
    this.cd.detectChanges();
    // console.log(this.ngbCalendar.getToday());
    // let date = { year: 2020, month: 1, day: 26 };
    // this.model1 = this.dateAdapter.toModel(date);
    //this.model1 = this.dateAdapter.toModel(this.ngbCalendar.getToday());
    //return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

}

class ModelData
{
  year : number;
  month : number;
  day : number;
}


