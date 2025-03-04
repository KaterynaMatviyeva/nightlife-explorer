import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { iEvent } from '../../../interfaces/i-event';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent {}
