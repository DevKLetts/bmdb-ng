import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  constructor(private router: Router) {}
  protected title = 'bmdb-ng';

  isLoginPage(): boolean {
    return this.router.url === '/user-login';
  }
}
