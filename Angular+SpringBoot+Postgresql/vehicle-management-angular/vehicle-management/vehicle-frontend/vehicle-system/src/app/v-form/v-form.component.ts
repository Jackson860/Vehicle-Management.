import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../v-edit/v-edit.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-v-form',
  templateUrl: './v-form.component.html',
  styleUrls: ['./v-form.component.css'],
})
export class VFormComponent {
  vehicleNum: string='';
  vehicleType: string = '';
  ownerName: string='';
  modelName: string = '';
  colour: string = '';
  engineType: string ='';
  colourOptions: string[] = [
    'Red',
    'Green',
    'Blue',
    'Yellow',
    'Grey',
    'Black',
    'White',
  ];
  vehicleTypeOptions: string[] = ['Four Wheel', 'Two Wheel'];
  engineTypeOptions: string[]=['Electric','Petrol','Diesel','Hybrid'];
  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private dialog: MatDialog) {}

  submitForm() {
    if (!this.vehicleNum || !this.vehicleType || !this.ownerName || !this.modelName || !this.colour || !this.engineType) {
      
      return;
    }else{
      this.router.navigate(['/v-logsuccess']);
    }

    const vehicleData = {
      vehicleNum:this.vehicleNum,
      vehicle: this.vehicleType,
      ownerName: this.ownerName,
      modelName: this.modelName,
      colour: this.colour,
      engine: this.engineType
    };

    this.http
      .post<any>('http://localhost:8080/api/vehicle', vehicleData)
      .subscribe(
        (response: any) => {
          console.log('Vehicle added successfully:', response);
          // window.alert('Vehicle added successfully!');
          this.resetForm();
        },
        (error: any) => {
          console.error('Error adding vehicle:', error);
          window.alert('Error adding vehicle. Please try again.');
        }
      );
  }

  resetForm() {
    this.vehicleNum='';
    this.vehicleType = '';
    this.ownerName ='';
    this.modelName = '';
    this.colour = '';
    this.engineType='';
  }
  logout() {
    localStorage.removeItem('accessToken');
    this.authService.logout();
  }
}
