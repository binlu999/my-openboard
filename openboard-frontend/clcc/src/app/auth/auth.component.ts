import { AuthClearError, AuthLoginStart, AuthSignupStart } from './store/auth.action';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  Subscription } from 'rxjs';
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
  private storeSub:Subscription;

  constructor(
    private componentfactoryResolver:ComponentFactoryResolver,
    private store:Store<AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState=>{
      this.isLoading=authState.isLoading;
      this.error=authState.authError;
      if(this.error){
        this.showErrorAlert(this.error);
      }
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
    if(this.isLoginMode){
      this.store.dispatch(new AuthLoginStart({email:email,password:password}));
    }else{
      this.store.dispatch(new AuthSignupStart({email:email,password:password}))
    }

    authForm.reset();
  }

  closeError(){
    this.store.dispatch(new AuthClearError());
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
   if(this.storeSub){
    this.storeSub.unsubscribe();
   }
  }
}
