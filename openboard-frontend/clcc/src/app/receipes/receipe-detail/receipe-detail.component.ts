import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Receipe } from '../receipe.model';
import { ReceipeService } from '../receipe.service';

@Component({
  selector: 'app-receipe-detail',
  templateUrl: './receipe-detail.component.html',
  styleUrls: ['./receipe-detail.component.css']
})
export class ReceipeDetailComponent implements OnInit {
  receipe:Receipe;
  id:number;
  constructor(private receipService:ReceipeService,private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (param:Params)=>{
        this.id=+param['id'];
        this.receipe=this.receipService.getReceipe(this.id);
      }
    )
    }

  addIngredientsToShoppingLIst(){
    this.receipService.addIntegredentsToShoppingList(this.receipe.ingredients);
  }

  onEdit(){
    this.router.navigate(['edit'],{relativeTo:this.route});
    //this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
  }

  onDelete(){
    this.receipService.deleteReceipe(this.id);
    this.router.navigate(['receipes']);
  }

}
