import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserLoginDTO } from '../model/user-login-dto'


const URL = "http://lettskory-everest.nord:8080/api/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

login(userLoginDTO:UserLoginDTO) : Observable<User>{
    return this.http.post(URL+'/login',userLoginDTO) as Observable<User>;
}

}