import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css']
})

export class AddChildComponent implements OnInit {
  
  bookForm: FormGroup;
  Books:any = [];

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
       name: [''],
       price: [''],
       description: [''],
     })
  }

  ngOnInit(): void {
    this.crudService.getBooks().subscribe( res=>{
      console.log(res)
      this.Books = res;
    })
  }

  onSubmit():any{
    this.crudService.addBook(this.bookForm.value)
    .subscribe(()=>{
      console.log('Data added successfully')
      this.ngZone.run(()=> this.router.navigateByUrl('/books-list'))
    },(err)=>{
      console.log(err)
    })
  }

  delete(id:any,i:any){
    console.log(id);
    this.crudService.deleteBook(id).subscribe(res => {
     
      this.Books.splice(i,1);
    })
  }
}

