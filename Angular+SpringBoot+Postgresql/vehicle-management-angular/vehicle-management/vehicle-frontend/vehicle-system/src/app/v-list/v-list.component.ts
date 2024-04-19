import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../v-edit/v-edit.component'; // Import your confirmation dialog component
import { VFormComponent } from '../v-form/v-form.component';
import { Vehicle } from '../../Vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-v-list',
  templateUrl: './v-list.component.html',
  styleUrls: ['./v-list.component.css'],
})
export class VListComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'vehicleNum',
    'vehicleType',
    'ownerName',
    'modelName',
    'colour',
    'engineType',
    'actions',
  ];
  selectedFilter: string = 'all';
  filterValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  // fetchData(): void {
  //   this.http.get<any[]>('http://localhost:8080/api/vehicle/list').subscribe(
  //     (response: any[]) => {
  //       this.dataSource = new MatTableDataSource(response);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     },
  //     (error: any) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  fetchData(): void {
    let url = 'http://localhost:8080/api/vehicle';
    if (this.selectedFilter && this.selectedFilter !== 'all') {
      url += `/search?term=${this.filterValue}`;
    }
    this.http.get<any[]>(url).subscribe(
      (response: any[]) => {
        if (Array.isArray(response)) {
          this.dataSource = new MatTableDataSource<any>(response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          console.error('Invalid data format received from API:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  performSearch(searchValue: string): void {
    if (searchValue.trim()) {
      // If search value is not empty, perform search/filter
      this.vehicleService.getAllVehicles(searchValue).subscribe(
        (response: Vehicle[]) => {
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error: any) => {
          console.error('Error fetching data:', error);
        }
      );
    } else {
      this.fetchData();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.vehicleService.getAllVehicles(filterValue).subscribe(
      (response: Vehicle[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  editVehicle(vehicle: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to edit this vehicle details?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Edit vehicle:', vehicle);
        this.router.navigate(['/v-edit', vehicle.id]);
      }
    });
  }

  deleteVehicle(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {
        message: 'Are you sure you want to delete this vehicle details?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http.delete(`http://localhost:8080/api/vehicle/${id}`).subscribe(
          () => {
            this.dataSource.data = this.dataSource.data.filter(
              (vehicle) => vehicle.id !== id
            );
            console.log('Vehicle deleted successfully.');
          },
          (error: any) => {
            console.error('Error deleting vehicle:', error);
          }
        );
      }
    });
  }

  


  logout() {
    localStorage.removeItem('accessToken');
    this.authService.logout();
  }

  navigateToAddVehicle() {
    this.router.navigate(['/v-form']);
  }
  refreshPage(): void {
    window.location.reload();
  }
}
