import React from 'react';
import styles from './curplace.module.scss';

interface PlaceDetailsProps {
    place: google.maps.places.PlaceResult | null;
}

const PlaceInfo: React.FC<PlaceDetailsProps> = ({ place }) => {
    if (!place) return null;

    const getPhoto = () => {
        if (place.photos && place.photos.length > 0) {
            const photoUrl = place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 });
            return <img className={styles.image} src={photoUrl} alt={place.name || 'Place'} />;
        }
        return <p>Изображение отсутствует</p>;
    };

    return (
        <div className={styles.container}>
            <h2>{place.name}</h2>
            <p className={styles.mainText}>{place.formatted_address}</p>
            {getPhoto()}
            {place.rating && <p className={styles.mainText}>Оценка: {place.rating}</p>}
        </div>
    );
};

export default PlaceInfo;
