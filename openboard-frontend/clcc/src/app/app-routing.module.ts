import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"
import { AuthComponent } from './auth/auth.component';


const appRoutes:Routes=[
    {path:'', redirectTo:'receipes', pathMatch:'full'},
    {path:'receipes', loadChildren: () => import('./receipes/receipe.module').then(
        m=> m.ReceipeModule
    )}
];
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}