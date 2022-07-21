import { Injectable } from '@angular/core';
import {Amplify, Auth} from 'aws-amplify';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IUser{
  email:string;
  password:string;
  showPassword:boolean;
  code:string;
  name:string;
}
@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  private authenticationSubject:BehaviorSubject<any>;
  constructor() {
    Amplify.configure({
      Auth:environment.cognito,
    })
    this.authenticationSubject=new BehaviorSubject<boolean>(false);
   }

   public signUp(user:IUser):Promise<any>{
    return Auth.signUp({
      username:user.email,
      password:user.password,
    });
   }
}
