

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

  form: FormGroup;
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
    private crudService: CrudService,
    private router:Router,
    private ngZone:NgZone,
  ) {
    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onSubmit():any{
    this.crudService.addBook(this.bookForm.value).subscribe(()=>{
      console.log('Data added successfully')
      this.ngZone.run(()=> this.router.navigateByUrl('/book-list'))
    },(err)=>{
      console.log(err)
    })
  }

  message: string;

showData2() {
  this.message = 'Succès';
}
showData() {
  this.form.value;
}

}
