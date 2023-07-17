import { Component, OnInit } from '@angular/core';
import {DataService} from '../../service/data.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  dataArr:any;
  constructor(private dataService:DataService) { 
    
  }

  ngOnInit() {
    this.getEmployeeData();
  }
  getEmployeeData(){
    this.dataService.getData().subscribe(res=>{
      this.dataArr=res;
    })
  }
}
