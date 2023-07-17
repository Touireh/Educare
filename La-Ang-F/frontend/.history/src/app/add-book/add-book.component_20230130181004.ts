

import { Component, OnInit ,NgZone} from '@angular/core';
import {Router} from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import {  FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  message='';
  form: FormGroup;
  formData: FormGroup;
  bookForm: FormGroup;

  /*constructor(
    public formBiulder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private crudService: CrudService
  ) { 
     this.bookForm = this.formBiulder.group({
       title: [''],
       price: [''],
       description: [''],
     })
  }*/

  constructor(
    public formBiulder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private crudService: CrudService
  ) {
    this.formData = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onSubmit(formData: FormGroup) {
    this.crudService.addBook(formData.value)
      .subscribe(
        response => {
          console.log(response);
          //ajouter le code pour afficher un message de succès ici
          console.log('Good');
        },
        error => {
          console.log(error);
          //ajouter le code pour gérer les erreurs ici
          console.log('Not Good');
        }
      );
  }


  showData() {
    this.message = 'Succès';
  }
}
