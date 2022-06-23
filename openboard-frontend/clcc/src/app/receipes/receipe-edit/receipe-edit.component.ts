import { ReceipeService } from './../receipe.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-receipe-edit',
  templateUrl: './receipe-edit.component.html',
  styleUrls: ['./receipe-edit.component.css']
})
export class ReceipeEditComponent implements OnInit {
  id:number;
  editMode=false;
  receipeForm:FormGroup;

  constructor(private route:ActivatedRoute, 
    private receipeService:ReceipeService,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editMode=params['id']!=null;
        this.initForm();
      }
    )
  }

  private initForm(){
    let name="";
    let description="";
    let imagePath="";
    let ingredients = new FormArray([]);

    if(this.editMode){
      const receipe=this.receipeService.getReceipe(this.id);
      name=receipe.name;
      description=receipe.description;
      imagePath=receipe.imagePath;
      
      if(receipe['ingredients']){
        for(const ingredient of receipe.ingredients){
          ingredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name,Validators.required),
              'amount':new FormControl(ingredient.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }
    this.receipeForm=new FormGroup({
      'name':new FormControl(name,Validators.required),
      'description':new FormControl(description,Validators.required),
      'imagePath':new FormControl(imagePath,Validators.required),
      'ingredients':ingredients
    });
  }

  get controls(){
    return (<FormArray>this.receipeForm.get('ingredients')).controls;
  }
  onSubmit(){
    console.log(this.receipeForm.value);
    if(this.editMode){
      this.receipeService.updateReceipe(this.id,this.receipeForm.value);
    }else{
      this.receipeService.addReceipe(this.receipeForm.value);
    }
    this.onCancel();
  }
  onAddIngredient(){
    (<FormArray>this.receipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  onDeleteIngredient(index:number){
    (<FormArray>this.receipeForm.get('ingredients')).removeAt(index);
    //Clear all
   // (<FormArray>this.receipeForm.get('ingredients')).clear();
  }
}
