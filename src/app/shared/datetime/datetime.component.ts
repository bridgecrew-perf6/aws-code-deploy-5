import {
  Component, OnInit, EventEmitter, Output, Input, ViewChild,
  Injectable
} from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  NgbDateStruct, NgbCalendar, NgbDatepicker,
  NgbDateAdapter, NgbDateParserFormatter, NgbDate
} from '@ng-bootstrap/ng-bootstrap';

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
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.css'],
  providers: [DatePipe,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }]
})
export class DatetimeComponent implements OnInit {

  constructor(private datePipe: DatePipe,
    private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) 
  { }
  
  @Input() heading: String = "";
  @Input() currentDate: any = {};
  ngOnInit(): void {
    this.today();
  }

  @Output() dateTimeChange: EventEmitter<any> = new EventEmitter<any>();
  addEvent(event) {
    //this.events.push(`${type}: ${event.value}`);
    console.log(this.time);
    console.log(event.replaceAll('-', '/') + " " + this.time["hour"] +":" + this.time["minute"]);
    this.dateTimeChange.emit(event.replaceAll('-', '/') + " " 
    + this.time["hour"] +":" + this.time["minute"]);
    //this.dateTimeChange.emit(this.datePipe.transform(event, 'dd/MM/yyyy hh:mm:ss a'));
  }

  time = { hour: 13, minute: 30 };

  model1: string;

  today() {
    //console.log(this.ngbCalendar.getToday());
    //let date = { year: 2020, month: 1, day: 26 };
    this.model1 = this.dateAdapter.toModel(this.currentDate);
    //this.model1 = this.dateAdapter.toModel(this.ngbCalendar.getToday());
    //return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

}
