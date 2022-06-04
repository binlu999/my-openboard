import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Receipe } from '../receipe.model';
import { ReceipeService } from '../receipe.service';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css']
})
export class ReceipeListComponent implements OnInit {
  receipes:Receipe[]=[]
  constructor(private receipeService:ReceipeService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.receipes=this.receipeService.getReceipes();
  }
  
  onAddNew(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }
}
