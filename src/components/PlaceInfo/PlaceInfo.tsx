import React, { useEffect, useState } from 'react';
import { useAppSelector } from "../../hooks/useAppSelector";
import favourite from '../../assets/icons/favourite.svg';
import styles from './places.module.scss';

interface Place {
    geometry: {
        location: {
            lat: () => number;
            lng: () => number;
        };
    };
    photos?: {
        getUrl: (options: { maxWidth: number; maxHeight: number; }) => string;
    }[];
    name: string;
}

const PlaceInfo: React.FC = () => {
    const placesList = useAppSelector((state) => state.places.places);
    const [places, setPlaces] = useState<Place[]>([]);

    useEffect(() => {
        if (Array.isArray(placesList)) {
            setPlaces(placesList);
        } else {
            console.error('Some error', placesList);
        }
    }, [placesList]);

    return (
        <div className={styles.placesContainer} key={places.length}>
            {places.map((place: Place, index) => (
                <div className={styles.placeCard} key={index}>
                    <div className={styles.placeInfo}>
                        {place.photos && place.photos.length > 0 ? (
                            <img
                                src={place.photos[0].getUrl({ maxWidth: 400, maxHeight: 100 })}
                                className={styles.placeImage}
                                alt={place.name}
                            />
                        ) : (
                            <div className={styles.noImage}>Нет изображения</div>
                        )}
                        <p className={styles.placeName}>
                            {place.name}
                        </p>
                    </div>
                    <button className={styles.favoriteButton}>
                        <img src={favourite} alt="Favourite" />
                    </button>
                </div>
            ))}
        </div>
    );
}

export default PlaceInfo;
