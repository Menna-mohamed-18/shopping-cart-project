import { jwtDecode } from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  private readonly Router = inject (Router)
  userData:any=null;


  sendRegisterForm(data:object):Observable <any>
  {
  return  this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }

  sendLoginForm(data:object):Observable <any>
  {
  return  this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }

  saveUserData():void{
if(localStorage.getItem('userToken') !== null){

  this.userData = jwtDecode(localStorage.getItem('userToken') !)
console.log('userData' , this.userData);


}
  }


  logOut():void{
    localStorage.removeItem('userToken');
    this.userData =null;
    this.Router.navigate(['/login'])
  }



  setEmailVerify(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` , data)
  }

  setCodeVerify(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode` , data)
  }
  
  
  setResetPass(data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword` , data)
  }
}
