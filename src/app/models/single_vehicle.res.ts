import { Agent } from './homes_res.model';


export interface Vehicle {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    vehicleMake: string;
    vehicleModel: string;
    manufactureYear: Date;
    plateNo: string;
    noOfPassengers: number;
    ratePerDay: number;
    transmission: string;
    fuel: string;
    agent: Agent;
}

export interface SingleVehicleRes {
    data: Vehicle;
}