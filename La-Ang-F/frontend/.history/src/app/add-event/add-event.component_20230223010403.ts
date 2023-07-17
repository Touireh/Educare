import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  eventTitle: string;
  eventDate: string;
  calendarOptions: CalendarOptions = {
    plugins: [ dayGridPlugin ],
    initialView: 'dayGridMonth',
    events: [
      { title: 'Sortie Géologique', date: '2023-02-21' },
      { title: 'Compétition Sportive', date: '2023-02-02' }
    ]
  };

  addEvent() {
    const newEvent = {
      title: this.eventTitle,
      date: this.eventDate
    };
    this.calendarOptions.events = [...this.calendarOptions.events, newEvent];
    this.eventTitle = '';
    this.eventDate = '';
  }

}

