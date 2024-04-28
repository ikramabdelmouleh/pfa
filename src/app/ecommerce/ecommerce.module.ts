import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { EcommerceComponent } from './ecommerce.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EcommerceComponent
  ],
  imports: [
    CommonModule,
    EcommerceRoutingModule, 
    FormsModule
  ],
  exports: [
    EcommerceComponent
  ]
})
export class EcommerceModule { }
