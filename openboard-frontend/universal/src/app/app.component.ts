import { AuthAutoLogin } from './auth/store/auth.action';
import { Component, Inject, OnInit,PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private store:Store<AppState>,
    @Inject(PLATFORM_ID) private platformId){

  }
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.store.dispatch(new AuthAutoLogin());
    }else{
      console.log('app component running on server');
    }
  }

}
