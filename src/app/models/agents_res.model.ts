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
    isActive: boolean;
}

export interface AgentRes {
    data: Agent[];
}