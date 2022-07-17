import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
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
            {path:'',component:ShoppingListComponent},
            //{path:'shopping-list',component:ShoppingListComponent},
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