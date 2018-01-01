import { Location }                 from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute }           from '@angular/router';

import { Address }        from '../address';
import { AddressService } from '../address.service';


@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.css']
})
export class AddressDetailComponent implements OnInit {
  @Input() address: Address;

  constructor(
    private route: ActivatedRoute,
    private addressService: AddressService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getAddress();
  }

  getAddress(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.addressService.getAddress(id)
      .subscribe(address => this.address = address);
  }

  goBack(): void {
    this.location.back();
  }
}
