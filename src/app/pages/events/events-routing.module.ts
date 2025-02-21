import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyEventsComponent } from './my-events/my-events.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventListComponent } from './event-list/event-list.component';

const routes: Routes = [
  { path: '', component: EventListComponent }, // Lista eventi pubblica
  { path: 'manage', component: MyEventsComponent }, // Pagina "I miei eventi" per ORGANIZER
  { path: 'manage/create', component: EventFormComponent }, // Creazione di un evento
  { path: 'manage/edit/:id', component: EventFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
