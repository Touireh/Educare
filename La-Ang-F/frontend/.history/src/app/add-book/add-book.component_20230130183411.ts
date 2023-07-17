

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
     this.bookForm = this.formBiulder.group({
       title: [''],
       price: [''],
       description: [''],
     })
  }

  ngOnInit(): void {
  }

  onSubmit():any {
    this.crudService.addBook(this.bookForm.value)
      .subscribe(
        res => {
          console.log(res);
          this.message = "Livre ajouté avec succès";
        },
        error => {
          console.log(error);
          this.message = error.message;
        }
      );
  }

  /*onSubmit(formData: FormGroup) {
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
  }*/


  showData() {
    this.message = 'Succès';
  }
}
