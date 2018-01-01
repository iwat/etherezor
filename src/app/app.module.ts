import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AddressesComponent } from './addresses/addresses.component';
import { AddressDetailComponent } from './address-detail/address-detail.component';
import { AddressService } from './address.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';


@NgModule({
  declarations: [
    AppComponent,
    AddressesComponent,
    AddressDetailComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [AddressService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
