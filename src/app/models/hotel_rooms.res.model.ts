export interface Room {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string;
    noOfPeople: number;
    chargesPerDay: number;
    totalUnits: number;
    availableUnits: number;
    status: string;
}

export interface HotelRoomRes {
    data: Room[];
}