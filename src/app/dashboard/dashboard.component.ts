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
  devices: trezor.Device[] = [];

  constructor(
    private addressService: AddressService,
    private trezorService: TrezorService
  ) { }

  ngOnInit() {
    this.getAddresses();
    this.devices = this.trezorService.listDevices();
    this.trezorService.addObserver(this);
  }

  onTrezorServiceEvent(e: string) {
    console.log('onTrezorServiceEvent:', e);
    if (e == "onDevicePin") {
      $('#pinDialog').modal();
    } else {
      this.devices = this.trezorService.listDevices();
    }
  }

  connectDevice(d: trezor.Device): boolean {
    this.trezorService.connectDevice(d);
    return false;
  }

  getAddresses(): void {
    this.addressService.getAddresses()
      .subscribe(addresses => this.addresses = addresses.slice(0, 4));
  }

  receiveMessage(event) {
    $('#pinDialog').modal('toggle');
    this.trezorService.pendingCallback(null, event);
  }
}
