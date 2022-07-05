import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth.intercepter";
import { ReceipeService } from "./receipes/receipe.service";

@NgModule({
    providers: [ReceipeService,
        {
          provide:HTTP_INTERCEPTORS,
          useClass:AuthInterceptorService,
          multi:true
        }
        ]
})
export class CoreModule {

}