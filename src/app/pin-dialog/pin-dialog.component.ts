import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pin-dialog',
  templateUrl: './pin-dialog.component.html',
  styleUrls: ['./pin-dialog.component.css']
})
export class PinDialogComponent implements OnInit {
  pin: string = "";

  @Output() onPINEntered = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  click(btn) {
    this.pin += btn;
  }

  unlock() {
    this.onPINEntered.emit(this.pin)
  }
}
