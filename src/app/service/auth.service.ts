import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/User.models';
import { map } from 'rxjs/operators';
import decode from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = "AIzaSyBEzdTZBpc-eMyCfV5i2alORXTRIin9H4s";
  private userToken: string ="";

  constructor(private http: HttpClient) {
      this.getToken()
   }

    login(user: UserModel){
      const userData ={
        email: user.email,
        password: user.password,
        returnSecureToken: true
      }
      return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, userData).pipe(
        map(res => {
          console.log("res: ")
          console.log(res);
          console.log("RXJS");
          this.saveToken(res["idToken"]);
          return res;
        }) 
      )
    }


    singUp(user: UserModel){
     const userData ={
       email: user.email,
       password: user.password,
       displayName: user.name,
       returnSecureToken: true
     }
     
     return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, userData).pipe(
       map(res => {
         console.log("res: ")
         console.log(res);
         console.log("RXJS");
         this.saveToken(res["idToken"]);
         return res;
       })
     )
    }

    logout(){
      localStorage.removeItem('token');
    }

    isLoggedIn(): boolean {
      this.getToken();
      return !!this.userToken && !this.isTokenExpired();
    }

    private getToken() {
      this.userToken = (localStorage.getItem('token')) ? localStorage.getItem('token'): null ;
    }

    private getTokenExpirationDate(): any{
      let token: any = decode(localStorage.getItem('token'));
      console.log("el token:", token.exp);

      if (!token){
        return null;
      }

      let date = new Date(0);
      date.setUTCSeconds(token.exp);
      return date;
    }

    private isTokenExpired() {
      let expDate = this.getTokenExpirationDate();
      return expDate < new Date();
    }

    private saveToken(idToken: string){
      this.userToken = idToken;
      localStorage.setItem('token',this.userToken);
      //localStorage.clear();
      let today = new Date();
      today.setSeconds(3600);
    }
}
