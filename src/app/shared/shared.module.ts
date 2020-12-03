import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GridComponent } from './grid/grid.component';
import {TableModule} from 'primeng/table';
import { DateComponent } from './date/date.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AutoCompleteModule} from 'primeng/autocomplete';

import { NgxMatNativeDateModule, NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { DatetimeComponent } from './datetime/datetime.component';
import { DaterangeComponent } from './daterange/daterange.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {ListboxModule} from 'primeng/listbox';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, GridComponent, DateComponent, DatetimeComponent, DaterangeComponent, LoadingIndicatorComponent, AutocompleteComponent],
  imports: [
    FormsModule,
    CommonModule,
    TableModule,
    AutoCompleteModule,
    NgbModule,
    ReactiveFormsModule,
    NgxMatNativeDateModule, NgxMatDatetimePickerModule, NgxMatTimepickerModule,
    MultiSelectModule, ListboxModule
    
  ],
  exports:[HeaderComponent,FooterComponent, GridComponent, DateComponent, DatetimeComponent,
     DaterangeComponent, LoadingIndicatorComponent, 
     FormsModule, ReactiveFormsModule, TableModule, AutocompleteComponent,MultiSelectModule,
     AutoCompleteModule, ListboxModule]
})
export class SharedModule { }
