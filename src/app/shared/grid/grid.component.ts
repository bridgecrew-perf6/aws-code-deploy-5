import { Component, OnInit, Input, ViewChild, ViewEncapsulation,
   Output, EventEmitter, OnChanges, SimpleChanges  } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GridComponent implements OnInit 
{
  @Input() datasource: any[] = [];
  @Input() cols: any[] = [];
  @Input() deleteBtn: boolean = false;
  @Input() editBtn: boolean = false;
  @Input() rowSelection: boolean = false;
  @Input() heading: String = "";
  @Input() selectedObjects: any = [];
  @Input() dataKey: String = "";
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() editChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedRows: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("grid1", { static: false }) grid1: Table;

  first: Number = 0;
  last: Number = 0;
  rows: Number = 10;
  totalRecords: Number = 100;
  next() {
    this.first = Number(this.first) + Number(this.rows);
  }

  prev() {
    this.first = Number(this.first) - Number(this.rows);
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.first === (this.datasource.length - Number(this.rows));
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }

  

  selectedRow(rowData: any) {
    console.log(rowData);
    this.change.emit(rowData);
  }

  editRow(rowData: any) {
    console.log(rowData);
    this.editChange.emit(rowData);
  }

  deleteRow(rowData: any) {
    console.log(rowData);
    this.deleteChange.emit(rowData);
  }

  onRowSelect(rowData: any) 
  {
    this.selectedRows.emit(this.selectedObjects);
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.grid1)
      this.grid1.reset();
  }

}
