import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../Vehicle'; 

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
    
    
  private apiUrl = 'http://localhost:8080/api/vehicle';

  constructor(private http: HttpClient) {}

  getAllVehicles(filter: string): Observable<Vehicle[]> {
    let url = 'http://localhost:8080/api/vehicle/search';
    if (filter) {
      url += `?term=${filter}`;
    }
    return this.http.get<Vehicle[]>(url);
  }

  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
  }
  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle);
  }

  updateVehicle(id: number, vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}/${id}`, vehicle);
  }

  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  

  
}
export { Vehicle };

