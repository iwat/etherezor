import { Component, OnInit } from '@angular/core';

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

  constructor(private trezorService: TrezorService) { }

  ngOnInit() {
    this.devices = this.trezorService.listDevices();
    this.trezorService.addObserver(this);

    if (this.devices.length > 0) {
      this.selectDevice(this.devices[0]);
    }
  }

  selectDevice(d: trezor.Device): boolean {
    this.selectedDevice = d;
    this.trezorService.selectDevice(d);
    return false;
  }

  onTrezorServiceEvent(e: string) {
    console.log('onTrezorServiceEvent:', e);
    this.devices = this.trezorService.listDevices();

    if ((this.selectedDevice == null || !this.selectedDevice.connected) && this.devices.length > 0) {
      this.selectDevice(this.devices[0]);
    }
  }
}
