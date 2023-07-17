import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private events: CalendarEvent[] = [
    { title: 'Sortie Géologique', start: new Date('2023-02-21T10:30:00'), end: new Date('2023-02-21T12:30:00') },
    { title: 'Compétition Sportive', start: new Date('2023-02-02T09:00:00'), end: new Date('2023-02-02T17:00:00') }
  ];

  constructor() { }

  getEvents(): CalendarEvent[] {
    return this.events;
  }

  addEvent(event: CalendarEvent): void {
    this.events.push(event);
  }
}
