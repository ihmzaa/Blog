import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
 
  errorMessage: string = '';

  constructor(private router: Router) {}
  
  login() {
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      let foundUser = users.find((user: any) => user.email === this.email && user.password === this.password);

      if (foundUser) {
        sessionStorage.setItem('loggedInUserId', foundUser.id.toString());
        this.errorMessage = '';
        this.router.navigate(['/article']);
      } else {
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    }

  toSign() {
    this.router.navigate(['/signup']);
  }
}
