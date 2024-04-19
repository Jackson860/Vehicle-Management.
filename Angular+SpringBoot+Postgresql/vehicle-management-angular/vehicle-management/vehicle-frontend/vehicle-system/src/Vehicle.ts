export class Vehicle {
    id: number;
    vehicleNum: string;
    vehicleType: string;
    ownerName: string;
    modelName: string;
    colour: string;
    engineType: string;
  
    constructor(
      id: number,
      vehicleNum: string,
      vehicleType: string,
      ownerName: string,
      modelName: string,
      colour: string,
      engineType: string
    ) {
      this.id = id;
      this.vehicleNum = vehicleNum;
      this.vehicleType = vehicleType;
      this.ownerName = ownerName;
      this.modelName = modelName;
      this.colour = colour;
      this.engineType = engineType;
    }
  }
  