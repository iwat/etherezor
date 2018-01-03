import { Injectable } from '@angular/core';

import 'babel-polyfill';
import trezor = require('trezor.js');


@Injectable()
export class TrezorService {
  connectedDevice: trezor.Device;
  deviceList: trezor.DeviceList;
  pendingCallback: any;
  observers: any[] = [];

  constructor() {
    this.deviceList = new trezor.DeviceList();
    this.deviceList.on('connect', this.onDeviceConnected.bind(this));
    this.deviceList.on('disconnect', this.onDeviceDisconnecteded.bind(this));
    this.deviceList.on('error', this.onDeviceListError.bind(this));
    this.deviceList.on('connectUnacquired', this.onUnacquiredDeviceConnected.bind(this));
  }

  public addObserver(observer: any) {
    this.observers.push(observer);
  }

  public connectDevice(d: trezor.Device) {
    if (d instanceof trezor.UnacquiredDevice) {
      d.steal();
      return;
    }

    d.waitForSessionAndRun(
      (session) => {
        return session.ethereumGetAddress(this.hdPath(44, 60, 0, 0, 0), false)
      })
      .then((result) => {
        console.log('Address:', result.message.address);
      })
      .catch((error) => {
        console.error('Call rejected:', error);
      });
  }

  public listDevices(): trezor.Device[] {
    let result: trezor.Device[] = [];
    for (let k in this.deviceList.devices) {
      result.push(this.deviceList.devices[k]);
    }
    return result;
  }

  //
  // Trezor DeviceList event handlers
  //

  private onDeviceConnected(device) {
    console.log('onDeviceConnected:', device);
    this.emitEvent('onDeviceConnected');

    device.on('button', this.onDeviceButton.bind(this, device));
    device.on('passphrase', this.onDevicePassphrase.bind(this, device));
    device.on('pin', this.onDevicePin.bind(this, device));
    device.on('disconnect', this.onDeviceDisconnected.bind(this, device));
  }

  private onDeviceDisconnecteded(device) {
    console.log('onDeviceDisconnecteded:', device);
    this.emitEvent('onDeviceDisconnecteded');
  }

  private onDeviceListError(error) {
    console.log('onDeviceListError:', error);
  }

  private onUnacquiredDeviceConnected(device) {
    console.log('onUnacquiredDeviceConnected:', device, 'stealing');
    device.steal();
  }

  //
  // Trezor Device event handlers
  //

  private onDeviceButton(device, code) {
    console.log('onDeviceButton:', device, code);
  }

  private onDeviceDisconnected(device) {
    console.log('onDeviceDisconnected:', device);
  }

  private onDevicePassphrase(device, callback) {
    console.log('onDevicePassphrase:', device, callback);
    callback(null, '');
  }

  private onDevicePin(device, type, callback) {
    console.log('onDevicePin:', device, type, callback);
    if (type == "PinMatrixRequestType_Current") {
      this.pendingCallback = callback;
      this.emitEvent('onDevicePin');
    } else {
      console.warn('PIN was requested', type);
    }
  }

  //
  // Observer
  //

  private emitEvent(e: string) {
    this.observers.forEach((o) => {
      o.onTrezorServiceEvent(e);
    });
  }

  //
  // Internal
  //

  private askUserForceAcquire(callback): number {
    console.log('askUserForceAcquire');
    return setTimeout(callback, 1000);
  }

  private hdPath(purpose: number, cointype: number, account: number, change: number, index: number): number[] {
    const hardeningConstant = 0x80000000;

    return [
      (purpose | hardeningConstant) >>> 0,
      (cointype | hardeningConstant) >>> 0,
      (account | hardeningConstant) >>> 0,
      change,
      index
    ]
  }
}
