import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router) {}
  register(): void {
    this.authService.register(this.name, this.email, this.password)
      .subscribe(
        () => {
          console.log('Registration successful');
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'You have successfully registered.',
          });
          this.router.navigate(['/login12']);
        },
        (error) => {
          console.error('Registration failed:', error);
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'An error occurred during registration. Please try again later.',
          });
        }
      );

}
}
