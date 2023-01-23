import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, isObservable } from 'rxjs';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
})
export class LogComponent implements OnInit {
  @Input() title?: string;
  @Input() description?: string;
  @Input() type?: string;
  @Input() active = false;
  @Input() data?: Observable<any> | any;
  @Output() onTap =  new EventEmitter<void>();
  @Output() onClear =  new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.onTap.emit();
  }

  onClickClear() {
    this.onClear.emit();
  }

  checkIsObservable(data: any): boolean{
    return isObservable(data);
  }

}
