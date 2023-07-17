import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
  Donations:any = [];

  constructor(public formBiulder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private crudService: Crud2Service
  ) { }

  ngOnInit() {}

}
