import { Component,  Input, OnInit} from '@angular/core';
import { Receipe } from '../../receipe.model';

@Component({
  selector: 'app-receipe-item',
  templateUrl: './receipe-item.component.html',
  styleUrls: ['./receipe-item.component.css']
})
export class ReceipeItemComponent implements OnInit {
  @Input() receipe:Receipe;
  @Input() index:number;

  constructor() { }

  ngOnInit(): void {
  }

  toString(number:number):string{
    return String(number);
  }
}
