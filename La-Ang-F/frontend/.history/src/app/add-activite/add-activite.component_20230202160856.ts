import { Component, OnInit ,NgZone} from '@angular/core';
import {Router} from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-activite',
  templateUrl: './add-activite.component.html',
  styleUrls: ['./add-activite.component.css']
})
export class AddActiviteComponent implements OnInit {

  showForm = false;
  activiteForm: FormGroup;
  Activites:any = [];

  constructor(
    public formBiulder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private crudService: CrudService
  ) { 
     this.activiteForm = this.formBiulder.group({
       name: [''],
       type: [''],
       description: [''],
     })
  }

  ngOnInit(): void {
    this.crudService.getActivites().subscribe( res=>{
      console.log(res)
      this.Activites = res;
    })
  }

  onSubmit():any{
    this.crudService.addActivite(this.activiteForm.value)
    .subscribe(()=>{
      console.log('Data added successfully')
      this.ngZone.run(()=> this.router.navigateByUrl('/add-activite'))
      v
    },(err)=>{
      console.log(err)
    })
  }

  delete(id:any,i:any){
    console.log(id);
    this.crudService.deleteActivite(id).subscribe(res => {
     
      this.Activites.splice(i,1);
    })
  }

}
