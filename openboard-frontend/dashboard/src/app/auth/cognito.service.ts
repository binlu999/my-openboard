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

   public confirmSignUp(user:IUser):Promise<any>{
    return Auth.confirmSignUp(user.email,user.code);
   }

   public signIn(user:IUser):Promise<any>{
    return Auth.signIn(user.email,user.password)
      .then(()=>{
        this.authenticationSubject.next(true);
      });
   }

   public signOut():Promise<any>{
    return Auth.signOut()
      .then(()=>{
        this.authenticationSubject.next(false);
      })
   }
   public isAuthenticated():boolean{
    return this.authenticationSubject.value;
   }

   public updateUser(user:IUser):Promise<any>{
    return Auth.currentUserPoolUser()
      .then((cognitoUser:any)=>{
        return Auth.updateUserAttributes(cognitoUser,user);
      });
   }

   public getUser():Promise<any>{
    return Auth.currentUserInfo();
   }
}
