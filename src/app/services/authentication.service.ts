import { Router } from '@angular/router';
import { config } from './../constants/global';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,private router: Router) { }

  login(email:string,password:string){
    let body = {
      email,
      password
    }
    return this.http.post(`${config.apiUrl}auth`,body, {
      observe: "response",     
    },);
  }

  getAccessToken() {
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    }
  }

  logOut() {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
    console.log("logged out successfully");
  }
}
