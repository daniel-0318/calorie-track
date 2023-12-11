import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-range-modal',
  templateUrl: './date-range-modal.component.html',
  styleUrls: ['./date-range-modal.component.scss'],
})
export class DateRangeModalComponent{

  @Input() title:string;
  @Input() type:string;
  @Output() date = new EventEmitter<any>();
  datemodal:any;


  constructor() {}

  datePick(event:any){
    this.datemodal = event.detail.value;
    this.date.emit({datemodal:this.datemodal, type:this.type});
  }
}
