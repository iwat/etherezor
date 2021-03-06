import { Component, OnInit } from '@angular/core';

import { Address } from '../address';
import { AddressService } from '../address.service';


@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  addresses: Address[];

  constructor(private addressService: AddressService) { }

  ngOnInit() {
    this.getAddresses();
  }

  getAddresses(): void {
    this.addressService.getAddresses()
      .subscribe(addresses => this.addresses = addresses);
  }
}
