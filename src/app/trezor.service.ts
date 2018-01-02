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
    this.deviceList.on('disconnect', this.onDeviceDisconnected.bind(this));
    this.deviceList.on('error', this.onDeviceListError.bind(this));
    this.deviceList.on('connectUnacquired', this.onUnacquiredDeviceConnected.bind(this));
  }

  addObserver(observer: any) {
    this.observers.push(observer);
  }

  eventObserved(e: string) {
    this.observers.forEach((o) => {
      o.onTrezorServiceEvent(e);
    });
  }

  listDevices(): trezor.Device[] {
    let result: trezor.Device[] = [];
    for (let k in this.deviceList.devices) {
      result.push(this.deviceList.devices[k]);
    }
    return result;
  }

  onDeviceConnected(device) {
    console.log('onDeviceConnected:', device);
    this.eventObserved('onDeviceConnected');

    // What to do on user interactions:
    device.on('button', (c) => { this.buttonCallback.apply(this, c) });
    device.on('passphrase', (cb) => { this.passphraseCallback.apply(this, cb) });
    device.on('pin', (t, cb) => { this.pinCallback.apply(this, [t, cb]) });

    // For convenience, device emits 'disconnect' event on disconnection.
    device.on('disconnect', () => {
      console.log('Disconnected an opened device');
    });

    // You generally want to filter out devices connected in bootloader mode:
    if (device.isBootloader()) {
      console.warn('Device is in bootloader mode, re-connect it');
      return;
    }

    var hardeningConstant = 0x80000000;

    // Ask the device to show first address of first account on display and return it
    /*
      device.waitForSessionAndRun(
        (session) => {
          return session.ethereumGetAddress([
            (44 | hardeningConstant) >>> 0,
            (60 | hardeningConstant) >>> 0,
            (0 | hardeningConstant) >>> 0,
            0,
            0
          ], true)
        })
        .then((result) => {
          console.log('Address:', result.message.address);
        })
        .catch((error) => {
          // Errors can happen easily, i.e. when device is disconnected or request rejected
          // Note: if there is general error handler, that listens on device.on('error'),
          // both this and the general error handler gets called
          console.error('Call rejected:', error);
        });
//*/
  }

  onDeviceDisconnected(device) {
    console.log('onDeviceDisconnected:', device);
  }

  onDeviceListError(error) {
    console.log('onDeviceListError:', error);
  }

  onUnacquiredDeviceConnected(device) {
    console.log('onUnacquiredDeviceConnected:', device);
    this.askUserForceAcquire(() => {
      device.steal().then(() => {
        console.log("steal done. now wait for another connect");
      });
    });
  }

  askUserForceAcquire(callback): number {
    console.log('askUserForceAcquire');
    return setTimeout(callback, 1000);
  }

  buttonCallback(code): void {
    console.log('buttonCallback:', code);
  }

  passphraseCallback(callback): void {
    console.log('passphraseCallback');
    callback(null, '');
  }

  pinCallback(type, callback): void {
    console.log('pinCallback:', type);
    if (type == "PinMatrixRequestType_Current") {
      this.pendingCallback = callback;
      $('#pinDialog').modal();
    } else {
      console.warn('PIN was requested', type);
    }
  }

}
