import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Receipe } from '../receipe.model';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css']
})
export class ReceipeListComponent implements OnInit {
  @Output() recepeWasSelected=new EventEmitter<Receipe>();
  receipes:Receipe[]=[
    new Receipe('Sample Receipe','This is a sample receipe for test','https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=375,341'),
    new Receipe('Sample Receipe 2','This is a sample receipe 2 for test','https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg')
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onReceipeSelected(receipe:Receipe){
    this.recepeWasSelected.emit(receipe);
  }
}
