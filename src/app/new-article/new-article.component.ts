import { Component } from '@angular/core';
import { Artikel } from '../Artikel'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent {
  
  artikel: Artikel[] = []; 
  newArtikel: Artikel = { newtitel: '', newInhalt: '' };
  showNewCard = false;
  errorMessage: string = '';
  sessionTitel: any ;
  sessionInhalt: any ;
  constructor(private router: Router) {}
  
  addNewArticle() {
    if (this.newArtikel.newtitel && this.newArtikel.newInhalt) {
      sessionStorage.setItem('titel', this.newArtikel.newtitel);
      sessionStorage.setItem('inhalt', this.newArtikel.newInhalt);
      
      this.artikel.push({ ...this.newArtikel }); 
      this.sessionTitel = sessionStorage.getItem('titel');
      this.sessionInhalt = sessionStorage.getItem('inhalt');
      this.showNewCard = true;
    }
  }
  reset(){
    const loggedInUserId = sessionStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = users.find((user: any) => user.id === +loggedInUserId);
      
      if (currentUser) {
        const userRole = currentUser.role
        if (userRole === 'Owner') {
          sessionStorage.removeItem('titel');
          sessionStorage.removeItem('inhalt');
          location.reload();
        }
        else{
          this.errorMessage = 'Sorry, admin access is required for this action.';
          alert(this.errorMessage);
        }
      }
    }
    
  }
 
  logout(){
    this.router.navigate(['./login'])
  }
  
}
