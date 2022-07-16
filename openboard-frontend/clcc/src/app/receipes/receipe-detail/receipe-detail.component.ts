import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { AddIngredients } from 'src/app/shopping-list/store/shopping-list.action';
import { AppState } from 'src/app/store/app.reducer';
import { Receipe } from '../receipe.model';
import { ReceipeDeleteReceipe } from '../store/receipe.actions';

@Component({
  selector: 'app-receipe-detail',
  templateUrl: './receipe-detail.component.html',
  styleUrls: ['./receipe-detail.component.css']
})
export class ReceipeDetailComponent implements OnInit {
  receipe: Receipe;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map((param: Params) => {
        return +param['id'];
      }),
      switchMap(id => {
        this.id = id;
        return this.store.select('receipes');
      }),
      map(receipState => {
        return receipState.receipes.find((receipe, index) => {
          return this.id === index
        })
      })
    ).subscribe(
      receipe => {
        this.receipe = receipe;
      }
    )
  }

  addIngredientsToShoppingLIst() {
    console.log('Add to SL');
    this.store.dispatch(new AddIngredients(this.receipe.ingredients));
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.store.dispatch(new ReceipeDeleteReceipe(this.id));
    this.router.navigate(['receipes']);
  }

}
