import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User | undefined; // Mark as possibly undefined

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe(
      (user: User) => {
        this.user = user;
      },
      (error) => {
        // Handle error while fetching user profile
        console.error('Failed to fetch user profile:', error);
        // You can redirect the user or display an error message
      }
    );
  }
}
