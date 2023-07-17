

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

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: [''],
      author: ['']
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
