import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './model/user.model';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'petclinic';
  
  user: User;
  constructor(
    private router: Router,
    private authenticationService: AuthService) {
    this.authenticationService.user.subscribe(x => this.user = x);
}


logout() {
  this.authenticationService.logout();
  this.router.navigate(['/login']);
}


}
