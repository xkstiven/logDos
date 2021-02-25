import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/User.models';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = "AIzaSyBEzdTZBpc-eMyCfV5i2alORXTRIin9H4s";
  private userToken: string ="";

  constructor(private http: HttpClient) {
      //this.getToken()
   }

    login(){

    }

    singUp(user: UserModel){
     const userData ={
       email: user.email,
       password: user.password,
       returnSecureToken: true
     }
     
     return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, userData).pipe(
       map(res => {
         console.log("res: ")
         console.log(res);
         console.log("RXJS");
         //this.saveToken(res["idToken"]);
         return res;
       })
     )
    }

    private saveToken(idToken: string){
      this.userToken = idToken;
      localStorage.setItem('token',this.userToken);
      localStorage.getItem('token');
      localStorage.clear();
    }
}
