import { Component, OnInit } from '@angular/core';
import {DataService} from '../../service/data.service';
import { Employee } from './employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  dataArr:any;
  employee=new Employee();
  constructor(private dataService:DataService) { 
    
  }

  ngOnInit() {
    //this.getEmployeeData();
  }
 /* getEmployeeData(){
    this.dataService.getData().subscribe(res=>{
      this.dataArr=res;
    })
  }*/
  insertData(){
    console.log(this.employee);
  }
}
