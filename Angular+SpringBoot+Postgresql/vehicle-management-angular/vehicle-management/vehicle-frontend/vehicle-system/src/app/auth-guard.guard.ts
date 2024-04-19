import { CanActivate, CanActivateFn, Router } from '@angular/router';

export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
   
    const isLoggedIn = !!localStorage.getItem('accessToken');

    if (!isLoggedIn) {
      
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}