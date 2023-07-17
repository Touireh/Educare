import { Component, OnInit ,NgZone} from '@angular/core';
import {Router} from '@angular/router';
import { Crud2Service } from '../service/crud2.service';
import { FormGroup, FormBuilder } from '@angular/forms';

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
