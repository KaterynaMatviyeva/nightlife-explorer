import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DiscoComponent } from './disco/disco.component';
import { PrePartyComponent } from './pre-party/pre-party.component';
import { AfterPartyComponent } from './after-party/after-party.component';


@NgModule({
  declarations: [
    HomeComponent,
    DiscoComponent,
    PrePartyComponent,
    AfterPartyComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
