import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService, IUser } from './cognito.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  loading=false;
  isConfirm=false;
  user:IUser;

  constructor(private router:Router,
    private cognitoService:CognitoService) {
      this.user={} as IUser;
     }

  ngOnInit(): void {

  }

  public signUp():void{
    this.loading=true;
    this.cognitoService.signUp(this.user)
    .then(()=>{
      this.loading=false;
      this.isConfirm=true;
    })
    .catch(()=>{
      this.loading=false;
    });
  }

  confirmSignUp(){}
}
