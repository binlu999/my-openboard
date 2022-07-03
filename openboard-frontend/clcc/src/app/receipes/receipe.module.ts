import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ReceipeDetailComponent } from "./receipe-detail/receipe-detail.component";
import { ReceipeEditComponent } from "./receipe-edit/receipe-edit.component";
import { ReceipeItemComponent } from "./receipe-list/receipe-item/receipe-item.component";
import { ReceipeListComponent } from "./receipe-list/receipe-list.component";
import { ReceipeStartComponent } from "./receipe-start/receipe-start.component";
import { ReceipesComponent } from "./receipes.component";

@NgModule({
    declarations:[
        ReceipesComponent,
        ReceipeListComponent,
        ReceipeDetailComponent,
        ReceipeItemComponent,
        ReceipeStartComponent,
        ReceipeEditComponent
    ],
    imports:[
        RouterModule,
        CommonModule,
        ReactiveFormsModule
    ],
    exports:[
        ReceipesComponent,
        ReceipeListComponent,
        ReceipeDetailComponent,
        ReceipeItemComponent,
        ReceipeStartComponent,
        ReceipeEditComponent
    ]
})
export class ReceipeModule{

}