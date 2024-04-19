// VehicleService.java
package com.vehicleoperate.vehicleoperation.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vehicleoperate.vehicleoperation.entity.Vehicle;

public interface VehicleService {

    List<Vehicle> getAllVehicles();
    Optional<Vehicle> getVehicleById(Long id);
    Vehicle addVehicle(Vehicle vehicle);
    Vehicle updateVehicle(Long id, Vehicle updatedVehicle);
    void deleteVehicle(Long id);
    Page<Vehicle> getAllVehicles(Pageable pageable); 
    List<Vehicle> searchVehicles(String searchTerm);
    boolean authenticate(String username, String password);
    void changePassword(String username, String newPassword);

}
