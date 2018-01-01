import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';

import { Address }        from './address';
import { ADDRESSES }      from './mock-addresses';
import { MessageService } from './message.service';


@Injectable()
export class AddressService {

  constructor(private messageService: MessageService) { }

  getAddress(id: string): Observable<Address> {
    this.messageService.add(`AddressService: fetched address hex=${id}`);
    return of(ADDRESSES.find(address => address.hex === id));
  }

  getAddresses(): Observable<Address[]> {
    this.messageService.add('AddressService: fetched addresses');
    return of(ADDRESSES);
  }
}
