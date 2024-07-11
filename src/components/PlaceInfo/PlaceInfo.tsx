import {useAppSelector} from "../../hooks/useAppSelector";
import {Place} from "./PlaceInfo.types";
import saved from '../../assets/icons/saved.png';
import route from '../../assets/icons/route.png';
import {useDispatch} from "react-redux";
import { deletePlaceFromFavorites } from "../../store/actions/favouritesActions";
import styles from './places.module.scss';


const PlaceInfo = () => {
    const placesList = useAppSelector((state) => state.favorites.favorites);
    const userId = useAppSelector((state) => state.user.id);
    const dispatch = useDispatch();

    const handleDeletePlace = (place: Place) => {
        // @ts-ignore
        dispatch(deletePlaceFromFavorites(userId, place.place_id));
    }

    const handleDeletePlaceCurried = (place: Place) => () => handleDeletePlace(place);


    return (
        <div className={styles.placesContainer} key={placesList.length}>
            {placesList.map((place: Place) => (
                <div className={styles.placeCard} key={place.geometry.lat}>
                    <div className={styles.mini}>
                        <img src={place.photos && place.photos[0].getUrl({ maxWidth: 400, maxHeight: 200})} style={{width: '100%', height: '100%'}}/>
                    </div>
                    <h2>{place.name}</h2>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
                    </p>
                    <div className={styles.tempWrapper}>
                        <button className={styles.iconButton} style={{background: 'none'}} onClick={handleDeletePlaceCurried(place)}>
                            <img src={saved} />
                            Сохранено
                        </button>
                        <button className={styles.routeButton} style={{background: '#5E7BC7'}}><img src={route} />Маршрут</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PlaceInfo