export interface Location {
    lat : number;
    lng : number;
}

export interface Pin {
    location : Location;
    label : string;
}