import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { GeneralResponse } from './../../models/general-response';
import { ServerDetails } from './../../models/server-details';
import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverDetails:ServerDetails = new ServerDetails();

  constructor(private _http:HttpClient,private router:Router) { }

  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl("/login");
  }


  public signUp(user:User ):Observable<GeneralResponse>{

    return this._http.post<GeneralResponse>(`${this.serverDetails.api}/auth/create-user`,user);
  }


  public getUser():User{
    return JSON.parse(localStorage.getItem('user'))
  }


  public login(user:User){

    const data = {
      user_id: user.email,
      user_password: user.user_pass
    }

     return this._http.post<any>(`${this.serverDetails.api}/auth/user-login`,data).pipe(
       map(
         data=>{
           const currentUser:User = data;
           currentUser.user_type = data.user_type;
           currentUser.token = data.token_val;
           currentUser.email = data.user_name;
            console.log(data);

           localStorage.setItem('user',JSON.stringify(currentUser));

           return data;
         }
       )
     );

  }

}
