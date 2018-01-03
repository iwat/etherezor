import { Component, OnInit } from '@angular/core';

import trezor = require('trezor.js');

import { Address }            from '../address';
import { AddressService }     from '../address.service';
import { PinDialogComponent } from '../pin-dialog/pin-dialog.component';
import { TrezorService }      from '../trezor.service';


@Component({
  selector: 'app-dashboard',
  host: { class: 'row' },
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  addresses: Address[] = [];

  constructor(
    private addressService: AddressService,
    private trezorService: TrezorService
  ) {
    this.trezorService.addObserver(this);
  }

  ngOnInit() { }

  onPINEntered(pin) {
    $('#pinDialog').modal('toggle');
    this.trezorService.pendingCallback(null, pin);
  }

  onTrezorServiceEvent(e: string) {
    if (e == 'onDeviceSelected') {
      var addresses: Address[] = [];
      this.trezorService.listAddresses();
    } else if (e == 'onDevicePin') {
      $('#pinDialog').modal();
    }
  }
}
