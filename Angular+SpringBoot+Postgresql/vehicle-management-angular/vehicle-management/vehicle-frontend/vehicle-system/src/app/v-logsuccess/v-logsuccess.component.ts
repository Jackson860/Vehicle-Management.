import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { VFormComponent } from '../v-form/v-form.component';

@Component({
  selector: 'app-v-logsuccess',
  templateUrl: './v-logsuccess.component.html',
  styleUrls: ['./v-logsuccess.component.css'],
})
export class VLogsuccessComponent {
  username: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.getUsername().subscribe((username) => {
      this.username = username;
    });
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.authService.logout();
  }
  navigateToAddVehicle(){
    this.router.navigate(['/v-form']);
  }
  navigateToChangePassword(): void {
    this.router.navigate(['/change-password']);
  }
 
}
