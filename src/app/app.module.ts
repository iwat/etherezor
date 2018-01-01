import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AddressesComponent } from './addresses/addresses.component';
import { AddressDetailComponent } from './address-detail/address-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    AddressesComponent,
    AddressDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
