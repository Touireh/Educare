import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

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

}

