interface Place {
    types: string;
    photo: any;
    name: string;
    photos?: google.maps.places.Photo[];
    geometry: {
        location: {
            lat: () => number;
            lng: () => number;
        };
    };
    formatted_address: string | null;
    user_ratings_total: number | null;
    rating: number | null;
    place_id: string;
}