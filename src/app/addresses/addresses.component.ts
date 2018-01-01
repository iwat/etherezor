import { Component, OnInit } from '@angular/core';
import { Address } from '../address';
import { ADDRESSES } from '../mock-addresses';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  addresses = ADDRESSES;

  selectedAddress: Address;

  constructor() { }

  ngOnInit() {
  }

  onSelect(address: Address): void {
    this.selectedAddress = address;
  }
}
