import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import { Receipe } from '../receipe.model';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css']
})
export class ReceipeListComponent implements OnInit,OnDestroy {
  subscription:Subscription;
  receipes:Receipe[]=[];
  constructor(
    private route:ActivatedRoute, 
    private router:Router,
    private store:Store<AppState>) { }
 
  ngOnInit(): void {
    this.subscription=this.store.select('receipes').pipe(
      map(
        receipeState => receipeState.receipes
      )
    ).subscribe(
      (receipes)=>{
        this.receipes=receipes;
      }
    )
  }
  
  onAddNew(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
