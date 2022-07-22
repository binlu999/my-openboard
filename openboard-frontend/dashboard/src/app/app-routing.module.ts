import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'signIn',
    pathMatch:'full'
  },
  {
    path:'signIn',
    component:SignInComponent
  },
  {
    path:'signUp',
    component:SignUpComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'**',
    redirectTo:'signIn'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
