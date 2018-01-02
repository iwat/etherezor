import { Location }                 from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute }           from '@angular/router';

import Web3 = require('web3');

import { Address }        from '../address';
import { AddressService } from '../address.service';


@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.css']
})
export class AddressDetailComponent implements OnInit {
  @Input() address: Address;

  web3: Web3;

  constructor(
    private route: ActivatedRoute,
    private addressService: AddressService,
    private location: Location
  ) { }

  ngOnInit() {
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://api.myetherapi.com/eth'));
    this.getAddress();
  }

  getAddress(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.addressService.getAddress(id)
      .subscribe((address) => {
        this.address = address;
        if (address == null) {
          return;
        }
        this.web3.eth.getBalance(address.hex)
          .then((success) => {
            console.log(success);
          })
          .catch((reason) => {
            console.log(reason);
          });
      });
  }

  goBack(): void {
    this.location.back();
  }
}
