import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  vorname: string = '';
  nachname: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  role: string = 'Guest';

  static nextUserId: number = 1;

  constructor(private router: Router) {}

  signup() {
    if (this.vorname && this.nachname && this.email && this.password) {
      // Increment user ID and create user object
      const userId = SignupComponent.nextUserId++;
      let user = {
        id: userId,
        vorname: this.vorname,
        nachname: this.nachname,
        email: this.email,
        password: this.password,
        role: this.role
      };

      // Retrieve existing users from localStorage
      let users = JSON.parse(localStorage.getItem('users') || '[]');

      // Check if user with the same email already exists
      let foundUser = users.find((u: any) => u.email === this.email);
      if (foundUser) {
        this.errorMessage = 'User with this email already exists.';
        return;
      }

     
      users.push(user);


      localStorage.setItem('users', JSON.stringify(users));


      sessionStorage.setItem('loggedInUserId', userId.toString());
      sessionStorage.setItem('email', this.email);

  
      this.router.navigate(['/article']);
    } else {
      this.errorMessage = 'Please fill out all fields.';
      console.log('Missing fields. Data not saved.');
    }
  }

  toLogin() {
    this.router.navigate(['/login']);
  }
}
