import PlaceInfo from "../../components/PlaceInfo/PlaceInfo";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useLoadScript } from "@react-google-maps/api";
import { addToFavorites } from "../../store/slices/favouriteSlice";
import { getFavoritePlaces } from "../../firebaseStorage";
import styles from './favourites.module.scss';

const Favorites = () => {
    const userId = useAppSelector((state) => state.user.id);
    const dispatch = useDispatch();

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });

    useEffect(() => {
        const fetchFavoritePlaces = async () => {
            if (isLoaded) {
                const service = new window.google.maps.places.PlacesService(
                    document.createElement('div')
                );

                try {
                    const favoritePlacesId = await getFavoritePlaces(userId);

                    favoritePlacesId.forEach((item) => {
                        // @ts-ignore
                        const placeId = item.place_id;
                        const request = {
                            placeId: placeId,
                            fields: ['name', 'formatted_address', 'geometry', 'photos', 'place_id'],
                        };
                        // @ts-ignore
                        service.getDetails(request, (place, status) => {
                            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                                // @ts-ignore
                                dispatch(addToFavorites(place));
                            } else {
                                console.error('Place details request failed:', status);
                            }
                        });
                    });
                } catch (error) {
                    console.error('Error fetching favorite places:', error);
                }
            } else if (loadError) {
                console.log(loadError);
            }
        };

        fetchFavoritePlaces();
    }, [isLoaded, loadError, userId, dispatch]);

    return (
        <div className={styles.favContainer}>
            <p className={styles.textLabel}>Избранное:</p>
            <PlaceInfo />
        </div>
    );
};

export default Favorites