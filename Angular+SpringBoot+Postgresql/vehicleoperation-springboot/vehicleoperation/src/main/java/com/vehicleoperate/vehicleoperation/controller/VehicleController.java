package com.vehicleoperate.vehicleoperation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vehicleoperate.vehicleoperation.entity.User;
import com.vehicleoperate.vehicleoperation.entity.Vehicle;
import com.vehicleoperate.vehicleoperation.repository.UserRepository;
import com.vehicleoperate.vehicleoperation.request.ChangePasswordRequest;
import com.vehicleoperate.vehicleoperation.service.VehicleServiceImpl;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
//@ConditionalOnProperty(name = "swagger.enabled", havingValue = "true")
public class VehicleController {

	@Autowired
	private VehicleServiceImpl vehicleServiceImpl;

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/vehicle")
	public List<Vehicle> getAllVehicles() {

		return vehicleServiceImpl.getAllVehicles();
	}

	@GetMapping("/vehicle/{id}")
	public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
		Optional<Vehicle> vehicle = vehicleServiceImpl.getVehicleById(id);
		return vehicle.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@GetMapping("/users/username")
	public ResponseEntity<Map<String, String>> getUsername() {

		String username = "Jackson";
		Map<String, String> response = new HashMap<>();
		response.put("username", username);

		return ResponseEntity.ok(response);
	}

	@PostMapping
	public ResponseEntity<Map<String, Object>> addVehicle(@RequestBody Vehicle vehicle) {
		System.out.println("Received vehicle data: " + vehicle);

		Vehicle addedVehicle = vehicleServiceImpl.addVehicle(vehicle);
		System.out.println("Added vehicle: " + addedVehicle);

		Map<String, Object> response = new HashMap<>();

		response.put("Message", "Vehicle added successfully");
		response.put("data", addedVehicle);

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@PutMapping("/vehicle/{id}")
	public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody Vehicle updatedVehicle) {
		Vehicle vehicle = vehicleServiceImpl.updateVehicle(id, updatedVehicle);
		if (vehicle != null) {
			return new ResponseEntity<>(vehicle, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/vehicle/{id}")
	public ResponseEntity<?> deleteVehicle(@PathVariable Long id) {
		try {
			vehicleServiceImpl.deleteVehicle(id);
			return ResponseEntity.ok().build();
		} catch (NoSuchElementException e) {
			return ResponseEntity.notFound().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody User user) {
		try {

			if (userRepository.existsByUsername(user.getUsername())) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
			}
			if (userRepository.existsByEmail(user.getEmail())) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
			}

			userRepository.save(user);

			return ResponseEntity.ok("User registered successfully");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register user");
		}
	}

	@PostMapping("/login")
	public ResponseEntity<User> loginUser(@RequestBody User loginUser) {
		Optional<User> userOptional = userRepository.findByUsername(loginUser.getUsername());
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			if (loginUser.getPassword().equals(user.getPassword())) {

				return ResponseEntity.ok(user);
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
			}
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@GetMapping("/vehicle/search")
	public List<Vehicle> searchVehicles(@RequestParam String term) {
		return vehicleServiceImpl.searchVehicles(term);
	}

	@PutMapping("/change-password")
	public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {

		if (!vehicleServiceImpl.authenticate(request.getUsername(), request.getCurrentPassword())) {

			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid current password");
		}

		vehicleServiceImpl.changePassword(request.getUsername(), request.getNewPassword());

		return ResponseEntity.ok("Password changed successfully");
	}
	

}
