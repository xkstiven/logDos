import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel} from '../../models/User.models';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user.email = "",
    this.user.password = ""
  }
  onSubmit(form: NgForm){
    if(form.invalid){return;}
    else{
      this.auth.login(this.user).subscribe(res => {
        alert("Login Correcto");
        this.router.navigateByUrl('/profile');
      },(err)=>{
        alert('plataforma en mantenimiento');
      })
    }
  }
}
