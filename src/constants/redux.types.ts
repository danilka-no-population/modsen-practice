export interface FilterState {
    buildingType: string;
    radius: string;
}

export interface PlacesState {
    places: Place[]
}

export interface UserState {
    email: string | null,
    token: string | null,
    id: string | null
}