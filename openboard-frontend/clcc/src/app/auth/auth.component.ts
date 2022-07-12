import { AuthLoginStart } from './store/auth.action';
import { AuthResponseData, AuthService } from './auth.service';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit , OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error:string=null;
  @ViewChild(PlaceHolderDirective) alertHost:PlaceHolderDirective;
  private closeSub:Subscription;

  constructor(private authService:AuthService, 
    private router:Router,
    private componentfactoryResolver:ComponentFactoryResolver,
    private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState=>{
      this.isLoading=authState.isLoading;
      this.error=authState.authError;
    })
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
      //authObserable = this.authService.signin(email,password);
      this.store.dispatch(new AuthLoginStart({email:email,password:password}));
    }else{
      authObserable=this.authService.signup(email,password);
    }
    // authObserable.subscribe(
    //   responseData =>{
    //     console.log(responseData);
    //     this.isLoading=false;
    //     this.router.navigate(['/receipes']);
    //   },
    //   errorMessage =>{
    //     console.log(errorMessage);
    //     this.error=errorMessage;
    //     this.showErrorAlert(errorMessage);
    //     this.isLoading=false;
    //   }
    // )

    authForm.reset();
  }

  closeError(){
    this.error=null;
  }

  private showErrorAlert(message:string){
    const alertCmpFactory = this.componentfactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();
    const componentRef=hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message=message;
    this.closeSub = componentRef.instance.closeMe.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })

  }

  ngOnDestroy(): void {
   if(this.closeSub){
    this.closeSub.unsubscribe();
   }
  }
}
