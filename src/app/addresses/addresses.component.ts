import { Component, OnInit } from '@angular/core';
import { Address } from '../address';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  address: Address = {
    hex: '0x19fc',
    label: 'Main'
  };

  constructor() { }

  ngOnInit() {
  }

}
