export interface Agent {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    agentName: string;
    ownerName: string;
    phoneNumber: string;
    locationAddress: string;
    latitude?: number;
    longitude?: number;
    isActive: boolean
}

export interface Home {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    propertyName: string;
    propertyDescription: string;
    status: string;
    type: string;
    rooms: number;
    paymentPeriod: string;
    locationAddress: string;
    latitude: string;
    longitude: string;
    country: string;
    city: string;
    price:number;
    images: string[];
    amenities:string[];
    agent: Agent;
}

export interface HomesResponse {
    data: Home[];
}