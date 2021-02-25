import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel} from '../../models/User.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();

  constructor() { }

  ngOnInit(): void {
    this.user.email = "",
    this.user.password = ""
  }
  sendData(form: NgForm){
    console.log("user: ", this.user);
    console.log("email: ", this.user.email);
    console.log("password: ", this.user.password);
  }
}
