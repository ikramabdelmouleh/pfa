import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    EcommerceModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
