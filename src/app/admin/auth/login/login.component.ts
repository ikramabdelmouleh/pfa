import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}


login(): void {
  this.authService.login(this.email, this.password).subscribe(
    (response) => {
      console.log('Login successful:', response);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have successfully logged in.',
      });
      this.router.navigate(['/administration']);
    },
    (error) => {
      console.error('Login failed:', error);
      this.errorMessage = 'Invalid email or password.';
    }
  );
}

}
