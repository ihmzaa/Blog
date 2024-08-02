import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  artTitel: string = 'Ein Blog oder auch Weblog ist ein meist auf einer Website geführtes und damit meist öffentlich einsehbares Tagebuch oder Journal, in dem mindestens eine Person, der Blogger, international auch Weblogger genannt, Aufzeichnungen führt, Sachverhalte protokolliert oder Gedanken niederschreibt. Die Tätigkeit des Schreibens in einem Blog wird als Bloggen bezeichnet. Die Deutsche Nationalbibliothek bezeichnet Blogs als Internetpublikationen und vergibt seit Herbst 2013 auch ISSNs an Weblogs.';
  errorMessage: string = '';
  nachname: string = '';

  constructor(private router: Router) {}

  AccesstoNewArticle() {
    const loggedInUserId = sessionStorage.getItem('loggedInUserId');
    
    if (loggedInUserId) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = users.find((user: any) => user.id === +loggedInUserId);

      if (currentUser) {
        const userRole = currentUser.role;
        
        if (userRole === 'Owner' || userRole === 'Crewmate' || userRole === 'Intership') {
          this.router.navigate(['./new-article']);
        } else {
          this.errorMessage = 'Sorry, admin access is required for this action.';
        }
      } else {
        this.errorMessage = 'User not found.';
      }
    } else {
      this.errorMessage = 'User not logged in.';
    }
  }

  logout() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('password');
    this.router.navigate(['./login']);
  }

  dashboard() {
    this.router.navigate(['./dashboard']);
  }
}
