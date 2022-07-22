import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from './auth/cognito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dashboard';
  constructor(private router:Router,
    private cognitoService:CognitoService){

  }

  isAuthenticated():boolean{
    return this.cognitoService.isAuthenticated();
  }

  signOut(){
    this.cognitoService.signOut()
      .then(()=>{
        this.router.navigate(['/signIn']);
      });
  }
}
