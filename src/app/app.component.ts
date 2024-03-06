import {Component} from '@angular/core';
import {User} from "./shared/interfaces/user";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  user: User | null = null;

  constructor(private _authService: AuthService,
              private router: Router) {
    this.fetchData();
  }

  fetchData() {
    this._authService.user$
      .subscribe({
          next: (data) => {
            this.user = data;
            console.log(data)
          },
          error: (error) => {
            console.error('Error fetching user:', error);
            this.user = null;
          }
        }
      );
  }

  logout() {
    this._authService.signOut().then(() => {
      this.router.navigate(['']);
    });
  }
}
