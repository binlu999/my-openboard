import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService, IUser } from '../cognito.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loading: boolean;
  user: IUser;

  constructor(
    private Router: Router,
    private congnitoService: CognitoService) {
      this.loading=false;
      this.user={} as IUser;
    }

  ngOnInit(): void {}

  public signIn():void{
    this.loading=true;
    this.congnitoService.signIn(this.user)
      .then(()=>{
        this.Router.navigate(['/profile']);
      }).catch(()=>{
        this.loading=false;
      })
  }
}
