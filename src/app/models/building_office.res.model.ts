export interface Building {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    buildingName: string;
    city: string;
    locationAddress: string;
    latitude: number;
    longitude: number;
    images: string[];
    isActive: boolean;
}

export interface BuildingOffice {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    officeName: string;
    description: string;
    size: string;
    floorNumbers?: any;
    paymentInterval: string;
    charges: number;
    totalUnits: number;
    availableUnits: number;
    status: boolean;
    building: Building;
}

export interface BuildingOfficeRes {
    data: BuildingOffice[];
}