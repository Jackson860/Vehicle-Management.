import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-v-edit',
  templateUrl: './v-edit.component.html',
  styleUrls: ['./v-edit.component.css'],
})
export class VEditComponent implements OnInit {
  vehicleId!: number;
  vehicleNum!: string;
  vehicleType!: string;
  ownerName!: string;
  modelName!: string;
  colour!: string;
  engineType!: string;

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
  engineTypeOptions: string[] = ['Electric', 'Petrol', 'Diesel', 'Hybrid'];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.vehicleId = +params['id'];

      this.fetchVehicleDetails();
    });
  }

  fetchVehicleDetails(): void {
    this.http
      .get<any>('http://localhost:8080/api/vehicle/' + this.vehicleId)
      .subscribe(
        (response: any) => {
          this.vehicleNum = response.vehicleNum;
          this.vehicleType = response.vehicle;
          this.ownerName = response.ownerName;
          this.modelName = response.modelName;
          this.colour = response.colour;
          this.engineType = response.engine;
        },
        (error: any) => {
          console.error('Error fetching vehicle details:', error);
        }
      );
  }

  submitForm(): void {
    if (!this.vehicleNum || !this.vehicleType || !this.ownerName || !this.modelName || !this.colour || !this.engineType) {
      console.log('Fill all fields');
      return;
    }else{
      
    
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to save the changes?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updatedVehicleData = {
          vehicleNum: this.vehicleNum,
          vehicle: this.vehicleType,
          ownerName: this.ownerName,
          modelName: this.modelName,
          colour: this.colour,
          engine: this.engineType,
        };

        this.http
          .put(
            'http://localhost:8080/api/vehicle/' + this.vehicleId,
            updatedVehicleData
          )
          .subscribe(
            () => {
              console.log('Vehicle details updated successfully.');
              this.router.navigate(['/v-logsuccess']);
            },
            (error: any) => {
              console.error('Error updating vehicle details:', error);
            }
          );
      }
    });
  }
}
}
@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Confirmation</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>No</button>
      <button mat-button [mat-dialog-close]="true">Yes</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
