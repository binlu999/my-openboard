import { AuthResponseData, AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error:string=null;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSwitchLoginMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(authForm:NgForm){
    if(!authForm.valid){
      return;
    }
    const email=authForm.value.email;
    const password=authForm.value.password;
    this.error=null;
    this.isLoading=true;
    let authObserable:Observable<AuthResponseData>;
    if(this.isLoginMode){
      authObserable = this.authService.signin(email,password);
    }else{
      authObserable=this.authService.signup(email,password);
    }
    authObserable.subscribe(
      responseData =>{
        console.log(responseData);
        this.isLoading=false;
        this.router.navigate(['/receipes']);
      },
      errorMessage =>{
        console.log(errorMessage);
        this.error=errorMessage;
        this.isLoading=false;
      }
    )

    authForm.reset();
  }
}
