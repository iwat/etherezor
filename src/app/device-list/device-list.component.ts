import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import trezor = require('trezor.js');

import { TrezorService }      from '../trezor.service';


@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  devices: trezor.Device[] = [];
  selectedDevice: trezor.Device;

  @Output() onDeviceSelected = new EventEmitter<trezor.Device>();

  constructor(private trezorService: TrezorService) { }

  ngOnInit() {
    this.devices = this.trezorService.listDevices();
    this.trezorService.addObserver(this);
    this.selectFirstDevice();
  }

  selectDevice(d: trezor.Device): boolean {
    this.selectedDevice = d;
    this.onDeviceSelected.emit(d);
    return false;
  }

  onTrezorServiceEvent(e: string) {
    console.log('onTrezorServiceEvent:', e);
    this.devices = this.trezorService.listDevices();
    this.selectFirstDevice();
  }

  private selectFirstDevice() {
    if (this.devices.length > 0) {
      this.selectDevice(this.devices[0]);
    } else {
      this.selectDevice(null);
    }
  }
}
