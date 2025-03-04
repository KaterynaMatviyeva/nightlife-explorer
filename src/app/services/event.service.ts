import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { iEvent } from '../interfaces/i-event';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  getEventsUrl: string = environment.getEventsUrl;
  postEventUrl: string = environment.postEventUrl;
  updateEventUrl: string = environment.updateEventUrl;
  deleteEventUrl: string = environment.deleteEventUrl;
  saveEventUrl: string = environment.saveEventUrl;

  //eventi filtrati prendi tutti e fai filter
  //getDiscoEvents (){}??
  //prePartyEvents
  //afterPartyEvents

  // BehaviorSubject che contiene la lista degli eventi
  private eventsSubject: BehaviorSubject<iEvent[]> = new BehaviorSubject<
    iEvent[]
  >([]);
  public events$: Observable<iEvent[]> = this.eventsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadEvents();
  }

  // Carica la lista degli eventi dal backend e aggiorna il BehaviorSubject
  loadEvents(): void {
    this.http.get<iEvent[]>(this.getEventsUrl).subscribe({
      next: (events: iEvent[]) => this.eventsSubject.next(events),
      error: (err: Error) =>
        console.error('Errore nel caricamento degli eventi:', err),
    });
  }

  // Ritorna l'observable della lista degli eventi
  getAllEvents(): Observable<iEvent[]> {
    return this.events$;
  }

  // Crea un nuovo evento e aggiorna il BehaviorSubject
  createEvent(newEvent: iEvent): Observable<iEvent> {
    return this.http.post<iEvent>(this.postEventUrl, newEvent).pipe(
      tap((createdEvent: iEvent) => {
        const currentEvents: iEvent[] = this.eventsSubject.value;
        this.eventsSubject.next([...currentEvents, createdEvent]);
        console.log("l'evento creato", this.eventsSubject.value);
      })
    );
  }

  // Aggiorna un evento esistente e aggiorna il BehaviorSubject
  updateEvent(id: number, updatedEvent: iEvent): Observable<iEvent> {
    const url: string = this.updateEventUrl.replace('{id}', id.toString());
    return this.http.put<iEvent>(url, updatedEvent).pipe(
      tap((returnedEvent: iEvent) => {
        const currentEvents: iEvent[] = this.eventsSubject.value;
        const index: number = currentEvents.findIndex(
          (event) => event.id === id
        );
        if (index !== -1) {
          currentEvents[index] = returnedEvent;
          this.eventsSubject.next([...currentEvents]);
        }
      })
    );
  }

  // Elimina un evento e aggiorna il BehaviorSubject
  deleteEvent(id: number): Observable<void> {
    const url: string = this.deleteEventUrl.replace('{id}', id.toString());
    return this.http.delete<void>(url).pipe(
      tap(() => {
        const currentEvents: iEvent[] = this.eventsSubject.value;
        const filtered: iEvent[] = currentEvents.filter(
          (event) => event.id !== id
        );
        this.eventsSubject.next(filtered);
      })
    );
  }

  getDiscoEvents(): Observable<iEvent[]> {
    return this.events$.pipe(
      map((events) => events.filter((ev) => ev.category === 'Discoteca'))
    );
  }

  getPrePartyEvents(): Observable<iEvent[]> {
    return this.events$.pipe(
      map((events) => events.filter((ev) => ev.category === 'Pre Party/Bar'))
    );
  }

  getAfterPartyEvents(): Observable<iEvent[]> {
    return this.events$.pipe(
      map((events) => events.filter((ev) => ev.category === 'After Party'))
    );
  }

  // Salva un evento nei preferiti (chiamata POST) e gestisce l'aggiornamento se necessario
  // saveEvent(id: number): Observable<unknown> {
  //   const url: string = this.saveEventUrl.replace('{id}', id.toString());
  //   return this.http.post<iEvent>(url, {}).pipe(
  //     tap(() => {
  //       // Se necessario, puoi richiamare loadEvents() per aggiornare la lista dei preferiti,
  //       // oppure aggiornare lo stato dell'utente tramite un altro BehaviorSubject.
  //     })
  //   );
  // }
}
