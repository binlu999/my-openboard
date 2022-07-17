import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations:[
        DropdownDirective, 
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceHolderDirective
    ],
    imports:[
        CommonModule
    ],
    exports:[
        DropdownDirective, 
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceHolderDirective,
        CommonModule,
    ]
})
export class SharedModule{

}