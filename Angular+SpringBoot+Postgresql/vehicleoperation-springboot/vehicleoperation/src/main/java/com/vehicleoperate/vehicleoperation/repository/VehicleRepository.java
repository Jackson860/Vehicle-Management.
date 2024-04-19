package com.vehicleoperate.vehicleoperation.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.vehicleoperate.vehicleoperation.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
	
//	Page<Vehicle> findByVehicleNumContaining(String vehicleNum, Pageable pageable);
	
	List<Vehicle> findByVehicleNumContainingIgnoreCase(String vehicleNum);
//	List<Student> findByStudentRegNoContainingIgnoreCase(String studentRegNo);

}