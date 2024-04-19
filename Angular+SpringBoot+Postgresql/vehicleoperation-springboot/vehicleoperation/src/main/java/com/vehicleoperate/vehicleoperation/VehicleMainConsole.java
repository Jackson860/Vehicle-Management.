package com.vehicleoperate.vehicleoperation;

import java.util.List;
import java.util.Optional;
import java.util.Scanner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.vehicleoperate.vehicleoperation.entity.Vehicle;
import com.vehicleoperate.vehicleoperation.service.VehicleService;

@SpringBootApplication
public class VehicleMainConsole {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(VehicleMainConsole.class, args);
        VehicleService vehicleService = context.getBean(VehicleService.class);
        try (Scanner sc = new Scanner(System.in)) {
			boolean running = true;
			while (running) {
			    System.out.println("Select operation:");
			    System.out.println("1. Insert vehicle data");
			    System.out.println("2. Update Existing vehicle data");
			    System.out.println("3. Delete the vehicle data");
			    System.out.println("4. Display all vehicle data");
			    System.out.println("Select an option to continue:");
			    int choice = sc.nextInt();
			    sc.nextLine(); 
			    switch (choice) {
			        case 1:
			        	System.out.print("Enter the Vehicle Number: ");
			            String vehicleNum = sc.nextLine();
			            System.out.print("Enter vehicle type (4 Wheel/2 Wheel): ");
			            String vehicleType = sc.nextLine();
			            System.out.print("Enter owner name: ");
			            String ownerName = sc.nextLine();
			            System.out.print("Enter model name: ");
			            String modelName = sc.nextLine();
			            System.out.print("Enter colour of the vehicle: ");
			            String colour = sc.nextLine();
			            System.out.print("Enter engine type of the vehicle: ");
			            String engineType = sc.nextLine();
			            Vehicle newVehicle = new Vehicle(vehicleNum,vehicleType, ownerName, modelName, colour, engineType);
			            Vehicle savedVehicle = vehicleService.addVehicle(newVehicle);
			            if (savedVehicle != null) {
			                System.out.println("The vehicle information has been inserted");
			            } else {
			                System.out.println("Failed to insert vehicle information");
			            }
			            break;
			        case 2:
			            System.out.print("Enter vehicle ID: ");
			            Long idToUpdate = Long.parseLong(sc.nextLine());
			            Optional<Vehicle> existingVehicleOptional = vehicleService.getVehicleById(idToUpdate);
			            if (existingVehicleOptional.isPresent()) {
			                Vehicle existingVehicle = existingVehicleOptional.get();

			                System.out.print("Enter updated vehicle type (4 Wheel/2 Wheel): ");
			                existingVehicle.setVehicle(sc.nextLine());

			                System.out.print("Enter updated model name of the vehicle: ");
			                existingVehicle.setModelName(sc.nextLine());

			                System.out.print("Enter updated colour of the vehicle: ");
			                existingVehicle.setColour(sc.nextLine());

			                System.out.print("Enter updated engine type of the vehicle: ");
			                existingVehicle.setEngine(sc.nextLine());

			                vehicleService.updateVehicle(idToUpdate, existingVehicle);
			                System.out.println("Vehicle information updated successfully");
			            } else {
			                System.out.println("Vehicle not found.");
			            }
			            break;
			        case 3:
			            System.out.print("Enter vehicle ID to delete: ");
			            Long idToDelete = Long.parseLong(sc.nextLine());
			            vehicleService.deleteVehicle(idToDelete);
			            System.out.println("Vehicle deleted successfully");
			            break;
			        case 4:
			            displayAllVehicles(vehicleService);
			            break;
			        default:
			            System.out.println("Invalid choice.");
			    }
			}
		} catch (NumberFormatException e) {
			
			e.printStackTrace();
		}
    }

    private static void displayAllVehicles(VehicleService vehicleService) {
        List<Vehicle> vehicles = vehicleService.getAllVehicles();
        for (Vehicle vehicle : vehicles) {
            System.out.println("Vehicle ID:" + vehicle.getId());
            System.out.println("Vehicle Type:" + vehicle.getVehicle());
            System.out.println("Owner Name:" + vehicle.getOwnerName());
            System.out.println("Model Name:" + vehicle.getModelName());
            System.out.println("Colour:" + vehicle.getColour());
            System.out.println("Engine Type:" + vehicle.getEngine());
            System.out.println();
        }
    }
}
