import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AddressService }         from './address.service';
import { AddressDetailComponent } from './address-detail/address-detail.component';
import { AddressesComponent }     from './addresses/addresses.component';
import { AppComponent }           from './app.component';
import { AppRoutingModule }       from './app-routing.module';
import { DashboardComponent }     from './dashboard/dashboard.component';
import { MaskPipe }               from './mask.pipe';
import { MessageService }         from './message.service';
import { MessagesComponent }      from './messages/messages.component';
import { PinDialogComponent }     from './pin-dialog/pin-dialog.component';
import { TrezorService }          from './trezor.service';


@NgModule({
  declarations: [
    AppComponent,
    AddressesComponent,
    AddressDetailComponent,
    MessagesComponent,
    DashboardComponent,
    PinDialogComponent,
    MaskPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule
  ],
  providers: [AddressService, MessageService, TrezorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
