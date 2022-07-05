import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { DropdownDirective } from "../shared/dropdown.directive";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
//import { ShoppingListRoutingModule } from './shopping-list-routing.module';

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports:[
        FormsModule,
        RouterModule.forChild([
            {path:'shopping-list',component:ShoppingListComponent},
        ]
        ),
        SharedModule
        //ShoppingListRoutingModule
    ],
    exports:[
        
    ]
})
export class ShoppingListModule {
}