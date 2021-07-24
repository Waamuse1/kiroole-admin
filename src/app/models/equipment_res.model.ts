import { Agent } from './agents_res.model';
export interface Equipment {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    equipment_name: string;
    description: string;
    type: string;
    city: string;
    country: string;
    location_address: string;
    latitude: number;
    longitude: number;
    images: string[];
    agent: Agent;
}

export interface EquipmentRes {
    data: Equipment[];
}
