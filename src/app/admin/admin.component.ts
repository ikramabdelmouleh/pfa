import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  animations: [
    trigger('transitionMessages', [
    ])
  ]
})
export class AdminComponent {
  constructor(private authService: AuthService, private router: Router) {}

  showWebsiteComponent: boolean = false;
  showSelectorsComponent: boolean = false;
  showcomm: boolean = false;
  onWebsiteLinkClick() {
    this.showWebsiteComponent = true;
    this.showSelectorsComponent = false;
    this.showcomm = false;
  }

  onSelectorsLinkClick() {
    this.showWebsiteComponent = false;
    this.showSelectorsComponent = true;
    this.showcomm = false;
  }

  oncommLinkClick() {
    this.router.navigateByUrl('/ecommerce', { skipLocationChange: true });
    window.open('/ecommerce', '_blank');
  }
  toggleWebsiteComponent() {
    this.showWebsiteComponent = !this.showWebsiteComponent;
  }

  logout(): void {
    this.authService.logout().subscribe(
      (response) => {
        console.log('Logout successful:', response);
        this.router.navigate(['/login12']);
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }
}
