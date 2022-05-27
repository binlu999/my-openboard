import { Component, OnInit } from '@angular/core';
import { Receipe } from './receipe.model';
import { ReceipeService } from './receipe.service';

@Component({
  selector: 'app-receipes',
  templateUrl: './receipes.component.html',
  styleUrls: ['./receipes.component.css'],
  providers:[ReceipeService]
})
export class ReceipesComponent implements OnInit {
  selectedReceipe:Receipe;
  constructor(private receipeService:ReceipeService) { }

  ngOnInit(): void {
    this.receipeService.selectedReceipe.subscribe(
      (receipe:Receipe)=>{
        this.selectedReceipe=receipe;
      }
    )
  }

}
