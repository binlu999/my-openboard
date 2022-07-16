import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { map } from 'rxjs/operators';
import { ReceipeAddReceipe, ReceipeUpdateReceipe } from '../store/receipe.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-receipe-edit',
  templateUrl: './receipe-edit.component.html',
  styleUrls: ['./receipe-edit.component.css']
})
export class ReceipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  receipeForm: FormGroup;
  storeSub:Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnDestroy(): void {
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  private initForm() {
    let name = "";
    let description = "";
    let imagePath = "";
    let ingredients = new FormArray([]);

    if (this.editMode) {
      this.storeSub=this.store.select('receipes').pipe(
        map((receipeState) => {
          return receipeState.receipes.find(
            (receipe, index) => {
              return this.id === index;
            }
          )
        })
      ).subscribe(receipe => {
        name = receipe.name;
        description = receipe.description;
        imagePath = receipe.imagePath;
        if (receipe['ingredients']) {
          for (const ingredient of receipe.ingredients) {
            ingredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            )
          }
        }
      })
    }
    this.receipeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'description': new FormControl(description, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'ingredients': ingredients
    });
  }

  get controls() {
    return (<FormArray>this.receipeForm.get('ingredients')).controls;
  }
  onSubmit() {
    console.log(this.receipeForm.value);
    if (this.editMode) {
      this.store.dispatch(new ReceipeUpdateReceipe({index:this.id,receipe:this.receipeForm.value}));
    } else {
      this.store.dispatch(new ReceipeAddReceipe(this.receipeForm.value));
    }
    this.onCancel();
  }
  onAddIngredient() {
    (<FormArray>this.receipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.receipeForm.get('ingredients')).removeAt(index);
    //Clear all
    // (<FormArray>this.receipeForm.get('ingredients')).clear();
  }
}
