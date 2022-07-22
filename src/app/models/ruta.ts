export interface Journey {
    "Origin": string;
    "Destination": string,
    "Price": number,
    "Flights": Flights[]
}

export interface Flights {
    "Origin": string;
    "Destination": string;
    "DestinationAux"?: string;
    "Price": number;
    "Transport": Transport;
}

export interface Transport {
    "FlightCarrier": string;
    "FlightNumber": number;
}