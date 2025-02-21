import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventFormComponent } from './event-form/event-form.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EventsComponent,
    EventListComponent,
    EventCardComponent,
    EventFormComponent,
    MyEventsComponent,
  ],
  imports: [CommonModule, EventsRoutingModule, FormsModule],
})
export class EventsModule {}
