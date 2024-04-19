package com.vehicleoperate.vehicleoperation.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.vehicleoperate.vehicleoperation.entity.User;
import com.vehicleoperate.vehicleoperation.entity.Vehicle;
import com.vehicleoperate.vehicleoperation.repository.UserRepository;
import com.vehicleoperate.vehicleoperation.repository.VehicleRepository;

@Service
public class VehicleServiceImpl implements VehicleService {

	@Autowired
	private VehicleRepository vehicleRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public List<Vehicle> getAllVehicles() {
		return vehicleRepository.findAll();
	}

	@Override
	public Optional<Vehicle> getVehicleById(Long id) {
		return vehicleRepository.findById(id);
	}

	@Override
	public Vehicle addVehicle(Vehicle vehicle) {
		return vehicleRepository.save(vehicle);
	}

	@Override
	public Vehicle updateVehicle(Long id, Vehicle updatedVehicle) {
		updatedVehicle.setId(id);
		return vehicleRepository.save(updatedVehicle);
	}

	@Override
	public void deleteVehicle(Long id) {
		vehicleRepository.deleteById(id);
	}

	@Override
	public Page<Vehicle> getAllVehicles(Pageable pageable) {
		return vehicleRepository.findAll(pageable);
	}

	public List<Vehicle> searchVehicles(String searchTerm) {
		return vehicleRepository.findByVehicleNumContainingIgnoreCase(searchTerm);
	}

	@Override
	public boolean authenticate(String username, String password) {
		Optional<User> userOptional = userRepository.findByUsername(username);
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			return user.getPassword().equals(password);
		}
		return false;
	}

	@Override
	public void changePassword(String username, String newPassword) {
		Optional<User> userOptional = userRepository.findByUsername(username);
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			user.setPassword(newPassword);
			userRepository.save(user);
		}
	}
}
