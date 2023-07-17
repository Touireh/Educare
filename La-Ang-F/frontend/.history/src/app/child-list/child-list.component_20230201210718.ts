import { Component, OnInit, NgZone } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { Crud2Service } from '../service/crud2.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.css']
})
export class ChildListComponent implements OnInit {

  getId:any;
  updateForm: FormGroup;


  constructor(
    public formBiulder: FormBuilder,
    private router: Router,
    private activateRout: ActivatedRoute,
    private ngZone: NgZone,
    private crudService: Crud2Service
  ) {
    this.getId = this.activateRout.snapshot.paramMap.get('id');
    this.crudService.getEnfant(this.getId).subscribe(res=>{
      console.log(res['enfant'])
      this.updateForm.setValue({
        fname: res['enfant']['fname'],
        lname: res['enfant']['lname'],
        age: res['enfant']['age'],
        Parent: res['enfant']['Parent'],
        maladie: res['enfant']['maladie'],
        annee: res['enfant']['annee'],
      });
    });

    this.updateForm = this.formBiulder.group({
      fname: [''],
        lname : [''],
        age: [''],
        Parent: [''],
        maladie: [''],
        annee: [''],
    })
   }

  ngOnInit(): void {
  }

  onUpdate(): any {
    this.crudService.updateEnfant(this.getId,this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully')
        this.ngZone.run(() => this.router.navigateByUrl('/child-list'))
      }, (err) => {
        console.log(err)
      })
  }

}