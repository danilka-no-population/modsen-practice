import React, { useEffect, useState } from 'react';
import {GoogleMap, useLoadScript, Marker, DirectionsRenderer, InfoWindow, Circle} from '@react-google-maps/api';
import { mapStyleArr } from "./map.styles";
import {useDispatch} from 'react-redux';
import { setPlacesList } from "../../store/slices/placeSlice";
import {useAppSelector} from "../../hooks/useAppSelector";
import {MarkersList} from "../../assets/icons/places";
import right from "../../assets/icons/right_arrow.png";
import close from "../../assets/icons/close.png";
import location from "../../assets/icons/location.svg";
import favoritesIcon from "../../assets/icons/newfav.svg";
import {toast, Toaster} from "react-hot-toast";
import { addPlaceToFavorites } from "../../store/actions/favouritesActions";
import styles from './styles.module.scss';
import CurrentPlace from '../CurrentPlace/CurrentPlace';

const mapContainerStyle = {
    width: '100%',
    height: '100vh',
};

const defaultCenter = {
    lat: 53.89148473951982,
    lng: 27.56005834796063,
};

const options = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: mapStyleArr,
};

const Map: React.FC = () => {
    const filters = useAppSelector((state) => state.filter);
    const dispatch = useDispatch();

    const user = useAppSelector((state) => state.user);
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [zoomValue, setZoomValue] = useState<number>(14);
    const [currentPlace, setCurrentPlace] = useState<any | null>(null);
    const [places, setPlaces] = useState<Place[]>([]);
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);

    const markers = MarkersList;
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });

    const handleGetRoute = (place: Place) => {
        if (place.geometry?.location) {
            const destination = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };

            setOrigin(mapCenter);

            if(directions == null) {


                const request: google.maps.DirectionsRequest = {
                    origin: origin!,
                    destination: destination,
                    travelMode: google.maps.TravelMode.WALKING
                };

                const directionsService = new google.maps.DirectionsService();
                directionsService.route(request, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                    } else {
                        console.error('Error fetching directions:', status);
                    }
                });
            } else {
                toast.error(`Toasty route error!`)
            }
        }
    };
    const handleGetRouteCurried = (place: Place)  => () => handleGetRoute(place);
    const handleDeleteRoute = () => setDirections(null);

    const handleAddFavorite = (place: Place) => {
        // @ts-ignore
        dispatch(addPlaceToFavorites(user.id, place));
    }

    const handleAddFavoriteCurried = (place: Place) => () => handleAddFavorite(place)

    useEffect(() => {

        try{
            navigator.geolocation.getCurrentPosition(function (position) {
                setMapCenter({lat: position.coords.latitude, lng: position.coords.longitude});
            });
        } catch (e){
            console.log(e);
        }

        if (isLoaded) {
            const service = new google.maps.places.PlacesService(
                document.createElement('div')
            );

            const queryParts = [];
            if (filters.name) {
                queryParts.push(filters.name);
            }
            if (filters.buildingType) {
                queryParts.push(filters.buildingType);
            }

            const query = queryParts.join(' ');

            const request = {
                query: query,
                location: mapCenter,
                radius: filters.radius
            };

            // @ts-ignore
            service.textSearch(request, (results: Place[], status: google.maps.places.PlacesServiceStatus) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    setPlaces(results);
                    dispatch(setPlacesList(results));
                } else {
                    console.error('Возникла ошибка при поиске мест:', status);
                }
            });

        }

        console.log(directions)

    }, [isLoaded, filters, directions]);


    useEffect(() => {

        if (currentPlace) {
            setZoomValue(16);
        }
    }, [currentPlace]);

    if (loadError) return <div>Ошибка загрузки карты</div>;
    if (!isLoaded) return <div>Загрузка карты...</div>;

    return (
        <div className={styles.mapContainer} style={{overflow: 'hidden'}}>
            <div className={styles.mapWrapper} style={{overflow: 'hidden'}}>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={zoomValue}
                    center={
                        currentPlace
                            ? {
                                lat: currentPlace.geometry.location.lat(),
                                lng: currentPlace.geometry.location.lng(),
                            }
                            : mapCenter
                    }
                    options={options}
                >
                    {mapCenter && (
                        <>
                            <Circle
                                center={mapCenter}
                                radius={filters.radius * 1.1}
                                options={{
                                    fillColor: '#0000FF',
                                    fillOpacity: 0.1,
                                    strokeColor: '#0000FF',
                                    strokeOpacity: 0.6,
                                    strokeWeight: 1,
                                }}
                            />
                        </>
                    )}
                    <Marker
                        position={{
                            lat: mapCenter.lat,
                            lng: mapCenter.lng
                        }}
                        icon={{
                            url: location,
                            scaledSize: new window.google.maps.Size(20, 20)
                        }}
                    />
                    {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }}/>}
                    {places.map((place, index) => {
                        const placeType = place.types?.[0] || '';
                        const markerData = markers[placeType];
                        const url = markerData ? markerData[0] : '';
                        return (
                            <Marker
                                key={index}
                                position={{
                                    lat: place.geometry.location.lat(),
                                    lng: place.geometry.location.lng(),
                                }}
                                icon={{
                                    url: url,
                                    scaledSize: new window.google.maps.Size(30, 30)
                                }}
                                onClick={() => setCurrentPlace(place)}
                            />
                        );
                    })}
                    {currentPlace && (
                        <InfoWindow
                            position={{ lat: currentPlace.geometry?.location?.lat() || 0, lng: currentPlace.geometry?.location?.lng() || 0 }}
                            onCloseClick={() => setCurrentPlace(null)}
                        >
                            <div className={styles.placesContainer}>
                                <CurrentPlace place={currentPlace}/>
                                <div style={{display: 'flex', justifyContent: "space-between", width: "100%", gap: '2em'}}>
                                    { directions == null ? ( <button className={styles.iconButton}
                                        color={'lightgreen'}
                                        onClick={handleGetRouteCurried(currentPlace)}
                                        style={{ width: '100%' }}
                                    >
                                        Построить путь
                                        <img src={right} alt="" style={{width: '20px', height: '20px'}}/>
                                    </button>
                                    ) : (
                                        <button className={styles.iconButton} onClick={handleDeleteRoute} style={{ width: '100%' }}>Отмена<img src={close} alt="" style={{width: '20px', height: '20px'}}/></button>
                                    )}
                                        <button className={styles.iconButton} style={{background: 'none'}} onClick={handleAddFavoriteCurried(currentPlace)}>
                                            <img src={favoritesIcon} />
                                        </button>
                                </div>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
        </div>
    );
};

export default Map