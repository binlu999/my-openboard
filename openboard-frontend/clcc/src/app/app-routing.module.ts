import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ReceipesComponent } from './receipes/receipes.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"
import { ReceipeStartComponent } from './receipes/receipe-start/receipe-start.component';
import { ReceipeDetailComponent } from './receipes/receipe-detail/receipe-detail.component';
import { ReceipeEditComponent } from './receipes/receipe-edit/receipe-edit.component';


const appRoutes:Routes=[
    {path:'', redirectTo:'receipes', pathMatch:'full'},
    {path: 'receipes', component:ReceipesComponent, children:[
        {path:'',component:ReceipeStartComponent},
        {path:'new',component:ReceipeEditComponent},
        {path:':id',component:ReceipeDetailComponent},
        {path:':id/edit',component:ReceipeEditComponent}
    ]},
    {path:'shopping-list',component:ShoppingListComponent}
];
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}