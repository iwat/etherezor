import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddressesComponent }     from './addresses/addresses.component';
import { AddressDetailComponent } from './address-detail/address-detail.component';
import { DashboardComponent }     from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'addresses', component: AddressesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: AddressDetailComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
