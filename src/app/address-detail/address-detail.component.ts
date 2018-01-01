import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../address';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.css']
})
export class AddressDetailComponent implements OnInit {
  @Input() address: Address;

  constructor() { }

  ngOnInit() {
  }

}
