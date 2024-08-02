import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
  vorname: string = '';
  nachname: string = '';
  email: string = '';
  role: string = 'Guest';
  showPasswordInput: boolean = false;
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const loggedInUserId = sessionStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = users.find((user: any) => user.id === +loggedInUserId);
      
      if (currentUser) {
        this.vorname = currentUser.vorname;
        this.nachname = currentUser.nachname;
        this.email = currentUser.email;
        this.role = currentUser.role || 'Guest';
      } else {
        console.log('User not found in localStorage');
      }
    } else {
      console.log('loggedInUserId not found in sessionStorage');
    }
  }
  
  onRoleChange(role: string) {
    this.role = role;
    this.showPasswordInput = true;
  }

  saveChanges() {
    if (this.password !== '123') {
      alert('The password is wrong, please enter your password.');
      return;
    }
    
    const loggedInUserId = sessionStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentRole = users.findIndex((user: any) => user.id === +loggedInUserId);
      
      if (currentRole != -1) {
        // users array updaten !!!!
        users[currentRole].role = this.role;
        
        localStorage.setItem('users', JSON.stringify(users));

        alert(`Changes saved. Role: ${this.role}`);
      } else {
        console.log('User not found in users array');
      }
    } 
  
    this.router.navigate(['./article'])
  }

}
