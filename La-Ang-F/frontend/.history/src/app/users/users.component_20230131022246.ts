import { Component, OnInit } from '@angular/core';
import { userModel } from '../models/user.model';
import { UserService } from '../service/user.service';

declare var $
declare var toastr;
declare var Toast;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  messsage='';
  users:userModel[];
  constructor(private useSer:UserService) {

   }

  ngOnInit(): void {
    this.useSer.AllUsers.subscribe(res=>{
      this.users=res
      console.log(this.users);
    });
  }

  add(){
    var message;
  /*const fd = new FormData();
  fd.append('name',$("#name").val());
  fd.append('email', $("#email").val());
  fd.append('password', $("#password").val());
  this.useSer.add(fd).subscribe(
    res=>{
      message=res;
      Toast.fire({
        type:"success",
        title:message.message        
      });
      this.useSer.getFromDb("");
    },
  error=>{error.error.error.forEach(element => {toastr.error("Error",element);});
  });
  }*/

  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  const fd = new FormData();
  fd.append('name',name);
  fd.append('email', email);
  fd.append('password', password);
  this.useSer.add(fd).subscribe(
    res=>{
      message=res;
      Toast.fire({
        type:"success",
        title:message.message        
      });
      this.useSer.getFromDb("");
    },
  error=>{error.error.error.forEach(element => {toastr.error("Error",element);});
  });
  }
  
}
