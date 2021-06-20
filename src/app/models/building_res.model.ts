import { Agent } from './homes_res.model';
export interface Building {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    buildingName: string;
    city: string;
    locationAddress: string;
    latitude: number;
    longitude: number;
    isActive: boolean;
    images: string[];
    agent: Agent;
}

export interface BuildingRes {
    data: Building[];
}