import { Component, OnInit ,NgZone} from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  
  showForm = false;
  showForm2 = false;
  bookForm: FormGroup;
  Books:any = [];
  getId:any;
  updateForm: FormGroup;

  

  /*constructor(
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
  }*/
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService,
    private activatedRoute: ActivatedRoute) {

  this.formBiulder = formBuilder;
  this.router = router;
  this.ngZone = ngZone;
  this.crudService = crudService;

  if (activatedRoute) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.getBook(this.getId).subscribe(res=>{
      console.log(res['book'])
      this.updateForm.setValue({
        name: res['book']['name'],
        price: res['book']['price'],
        description: res['book']['description'],
      });
    });
  } else {
    this.bookForm = this.formBiulder.group({
      name: [''],
      price: [''],
      description: [''],
    })
  }
}


  showUpdateForm() {
    if (!this.showForm2) {
      this.showForm2 = true;
    }
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
      this.ngZone.run(()=> this.router.navigateByUrl('/add-book'))
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

  onUpdate(): any {
    this.crudService.updateBook(this.getId,this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully')
        window.location.reload();
      }, (err) => {
        console.log(err)
      })
  }
}
