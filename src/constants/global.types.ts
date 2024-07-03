interface Place {
    photo: any;
    name: string;
    photos?: google.maps.places.Photo[];
    geometry: {
        location: {
            lat: () => number;
            lng: () => number;
        }
    }
}