package com.vehicleoperate.vehicleoperation.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vehicleNum;
    private String vehicle;
    private String ownerName;
    private String modelName;
    private String colour;
    private String engine;
    
    
    public Vehicle() {
    }

    
    public Vehicle(String vehicleNum, String vehicleType, String ownerName,  String modelName, String colour, String engineType) {
    	this.vehicleNum=vehicleNum;
        this.vehicle = vehicleType;
        this.ownerName= ownerName;
        this.modelName = modelName;
        this.colour = colour;
        this.engine = engineType;
    }
    
    public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getVehicleNum() {
		return vehicleNum;
	}


	public void setVehicleNum(String vehicleNum) {
		this.vehicleNum = vehicleNum;
	}


	public String getVehicle() {
		return vehicle;
	}


	public void setVehicle(String vehicle) {
		this.vehicle = vehicle;
	}


	public String getOwnerName() {
		return ownerName;
	}


	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}


	public String getModelName() {
		return modelName;
	}


	public void setModelName(String modelName) {
		this.modelName = modelName;
	}


	public String getColour() {
		return colour;
	}


	public void setColour(String colour) {
		this.colour = colour;
	}


	public String getEngine() {
		return engine;
	}


	public void setEngine(String engine) {
		this.engine = engine;
	}


	
    
    
   

	
    
   
}
