import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Receipe } from '../receipe.model';
import { ReceipeService } from '../receipe.service';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css']
})
export class ReceipeListComponent implements OnInit {
  @Output() recepeWasSelected=new EventEmitter<Receipe>();
  receipes:Receipe[]=[]
  constructor(private receipeService:ReceipeService) { }

  ngOnInit(): void {
  }

  onReceipeSelected(receipe:Receipe){
    this.recepeWasSelected.emit(receipe);
  }
}
