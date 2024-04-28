import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { WebsiteComponent } from './website/website.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EcommerceModule } from '../ecommerce/ecommerce.module';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AdminComponent,
    WebsiteComponent,
    AuthComponent,
    LoginComponent,
    RegistrationComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    FontAwesomeModule,
    EcommerceModule,
    MatPaginatorModule,
    FormsModule

  ]
})
export class AdminModule { }
