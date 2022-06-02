import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ReceipesComponent } from './receipes/receipes.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const appRoutes:Routes=[
    {path:'', redirectTo:'receipes', pathMatch:'full'},
    {path: 'receipes', component:ReceipesComponent},
    {path:'shopping-list',component:ShoppingListComponent}
];
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}