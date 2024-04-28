import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { WebsiteComponent } from './website/website.component';
import { EcommerceComponent } from '../ecommerce/ecommerce.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'website', component: WebsiteComponent },
      { path: 'ecommerce', component: EcommerceComponent }, // Define the route for 'ecommerce'

      // Other child routes
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
