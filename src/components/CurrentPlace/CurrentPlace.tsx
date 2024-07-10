import React from 'react';
import {MarkersList} from "../../assets/icons/places";
import styles from './curplace.module.scss';

interface PlaceDetailsProps {
    place: google.maps.places.PlaceResult ;
}
const CurrentPlace: React.FC<PlaceDetailsProps> = ({ place }) => {
    if (!place) return null;
    const markers = MarkersList;
    const getPlacePhoto = () => {
        if (place.photos && place.photos.length > 0) {
            const photoUrl = place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 });
            return <img src={photoUrl} alt={place.name || 'Place'} />;
        }
    };

    const { name, formatted_address, rating, user_ratings_total } = place;

    return (
        <div className={styles.container}>
            {getPlacePhoto()}
            <h2>{name}</h2>
            <p className={styles.mainText}>{formatted_address}</p>
            <p className={styles.mainText}>{rating && `Рейтинг: ${rating}`}</p>
            <p className={styles.mainText}>{user_ratings_total && `Отзывов: ${user_ratings_total}`}</p>
            <div className={styles.tempWrapper}>
                {
                    place?.types?.map((type) => {
                        if (markers && markers[type] && markers[type][0]) {
                            return <img src={markers[type][0]} alt={type} key={type} style={{width: '30px'}}/>;
                        } else {
                            return null;
                        }
                    })
                }
            </div>
        </div>
    );
};

export default CurrentPlace