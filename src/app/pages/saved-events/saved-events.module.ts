import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedEventsRoutingModule } from './saved-events-routing.module';
import { SavedEventsComponent } from './saved-events.component';


@NgModule({
  declarations: [
    SavedEventsComponent
  ],
  imports: [
    CommonModule,
    SavedEventsRoutingModule
  ]
})
export class SavedEventsModule { }
