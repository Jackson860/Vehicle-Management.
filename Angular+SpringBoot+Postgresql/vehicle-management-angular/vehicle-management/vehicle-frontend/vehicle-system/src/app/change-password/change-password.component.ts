import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  username!: string;
  currentPassword!: string;
  newPassword!: string;
  confirmPassword!: string;
  hideCurrentPassword: boolean=true;
  hideNewPassword: boolean=true;
  hideConfirmPassword: boolean=true;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  changePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.snackBar.open('New passwords do not match!', 'Close', {
        duration: 3000,
      });
      return;
    }

    this.authService.changePassword(this.username, this.currentPassword, this.newPassword)
      .subscribe(
        () => {
          
          this.snackBar.open('Password changed successfully!', 'Close', {
            duration: 3000,
          });
          
          this.username = '';
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
        },
        (error) => {
          if (error instanceof HttpErrorResponse && error.status === 200) {
            
            this.snackBar.open('Password changed successfully!', 'Close', {
              duration: 3000,
            });
            
            this.username = '';
            this.currentPassword = '';
            this.newPassword = '';
            this.confirmPassword = '';

            this.router.navigate(['/v-logsuccess']);
          } else {
            let errorMessage = 'Failed to change password. Please try again.';
            if (error instanceof HttpErrorResponse && error.error) {
              errorMessage = error.error.message || errorMessage;
            }
            this.snackBar.open(errorMessage, 'Close', {
              duration: 3000,
            });
            console.error('Error changing password:', error);
          }
        }
      );
  }
  toggleCurrentPasswordVisibility(): void {
    this.hideCurrentPassword = !this.hideCurrentPassword;
  }
  toggleNewPasswordVisibility(): void {
    this.hideNewPassword = !this.hideNewPassword;
  }
  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword=!this.hideConfirmPassword;
  }
  logout() {
    localStorage.removeItem('accessToken');
    this.authService.logout();
  }
  // navigateToAddVehicle(){
  //   this.router.navigate(['/v-form']);
  // }
  // navigateToChangePassword(): void {
  //   this.router.navigate(['/change-password']);
  // }
  
}
