import { Agent } from './homes_res.model';


export interface Hotel {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    hotelName: string;
    city: string;
    ownerId: string;
    contact: string;
    noOfRooms: number;
    locationAddress: string;
    latitude: number;
    longitude: number;
    isActive: boolean;
    images: string[];
    agent: Agent;
}

export interface HotelRes {
    data: Hotel[];
}