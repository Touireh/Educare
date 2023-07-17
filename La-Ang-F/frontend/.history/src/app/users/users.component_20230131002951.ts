import { Component, OnInit } from '@angular/core';
import { userModel } from '../models/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:userModel[];
  constructor(private useSer:UserService) {

   }

  ngOnInit(): void {
    this.useSer.AllUsers.subscribe(res=>{
      this.users=res
      console.log(this.users);
    });
  }

  onSelect()

}
