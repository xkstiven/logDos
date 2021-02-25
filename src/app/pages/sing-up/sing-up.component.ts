import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserModel} from '../../models/User.models';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  user: UserModel = new UserModel();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user.email = '',
    this.user.name = '',
    this.user.password = ''
  }

  onSubmit(form: NgForm){
    if(form.invalid){return;}
    else{
      this.auth.singUp(this.user).subscribe(res => {
        alert("usuario registrado");
        this.router.navigateByUrl('/profile');
      },(err)=>{
        alert('plataforma en mantenimiento');
      })
    }
  }
}
