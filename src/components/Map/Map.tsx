import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleMap, useLoadScript, Marker, InfoWindow, DirectionsRenderer, Circle } from '@react-google-maps/api';
import { mapStyleArr } from './map.styles';
import styles from './styles.module.scss';
import { categoriesIcons } from '../../constants/markers';
import CurrentPlace from '../CurrentPlace/CurrentPlace';
import location from '../../assets/icons/location.svg';
// @ts-ignore
import { RootState } from '../app/store';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setPlacesList } from '../../store/slices/placeSlice';

const DEFAULT_OPTIONS = { disableDefaultUI: true, zoomControl: true, styles: mapStyleArr };
const DEFAULT_CENTER = { lat: 53.89148473951982, lng: 27.56005834796063 };
const MAP_DIMENSIONS = { width: '100%', height: '100vh' };

const Map: React.FC = () => {
    const dispatch = useDispatch();
    const filterSettings = useAppSelector((state: RootState) => state.filter);
    const [zoomLevel, setZoomLevel] = useState<number>(14);
    const [currentLocation, setCurrentLocation] = useState<Place | null>(null);
    const [locations, setLocations] = useState<Place[]>([]);
    const [activeLocation, setActiveLocation] = useState<any>(null);
    const [routeDirections, setRouteDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null);
    const [watchId, setWatchId] = useState<number | null>(null);

    const mapElement = useRef<google.maps.Map | null>(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });

    const handleMapLoad = useCallback((map: google.maps.Map) => {
        mapElement.current = map;
        const id = navigator.geolocation.watchPosition(
            (position) => {
                const userCenter = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setUserPosition(userCenter);
                setZoomLevel(16);
            },
            (error) => console.error(error),
            { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
        );
        setWatchId(id);
    }, []);

    useEffect(() => {
        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, [watchId]);

    useEffect(() => {
        if (isLoaded && userPosition) {
            const service = new google.maps.places.PlacesService(document.createElement('div'));

            const request = {
                location: userPosition,
                radius: filterSettings.radius,
                type: [filterSettings.buildingType],
                name: [filterSettings.name]
            };

            //@ts-ignore
            service.nearbySearch(request, (results: Place[], status: google.maps.places.PlacesServiceStatus) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    setLocations(results);
                    dispatch(setPlacesList(results));
                } else {
                    console.error('Error:', status);
                }
            });
        }
    }, [isLoaded, userPosition, filterSettings, dispatch, name]);

    useEffect(() => {
        if (currentLocation) {
            setZoomLevel(14);
        }
    }, [currentLocation]);

    const createRoute = (place: Place) => {
        if (place.geometry?.location && userPosition) {
            const destination = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };

            const directionsRequest: google.maps.DirectionsRequest = {
                origin: userPosition,
                destination,
                travelMode: google.maps.TravelMode.WALKING,
            };

            const directionsService = new google.maps.DirectionsService();
            directionsService.route(directionsRequest, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setRouteDirections(result);
                } else {
                    console.error('Error fetching directions:', status);
                }
            });
        }
    };

    const handleRouteCreation = (place: Place) => () => createRoute(place);
    const clearRoute = () => setRouteDirections(null);

    if (loadError) return <div>Ошибка загрузки карты</div>;
    if (!isLoaded) return <div>Загрузка карты...</div>;

    return (
        <div className={styles.mapContainer}>
            <div className={styles.mapWrapper}>
                <GoogleMap
                    mapContainerStyle={MAP_DIMENSIONS}
                    zoom={zoomLevel}
                    center={userPosition || DEFAULT_CENTER}
                    onLoad={handleMapLoad}
                    options={DEFAULT_OPTIONS}
                >
                    {routeDirections && <DirectionsRenderer directions={routeDirections} />}
                    {userPosition && (
                        <>
                            <Marker
                                position={userPosition}
                                icon={{
                                    url: location,
                                    scaledSize: new google.maps.Size(25, 25),
                                }}
                            />
                            <Circle
                                center={userPosition}
                                radius={filterSettings.radius}
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
                    {locations.map((place, index) => (
                        <Marker
                            key={index}
                            position={{
                                lat: place.geometry.location.lat(),
                                lng: place.geometry.location.lng(),
                            }}
                            onClick={() => {
                                setCurrentLocation(place);
                                setActiveLocation(place);
                            }}
                            icon={{
                                url: categoriesIcons[place.types?.[0] || ''] || '',
                                scaledSize: new window.google.maps.Size(30, 30),
                            }}
                        />
                    ))}

                    {activeLocation && (
                        <InfoWindow
                            position={{
                                lat: activeLocation.geometry.location.lat(),
                                lng: activeLocation.geometry.location.lng(),
                            }}
                            onCloseClick={() => setActiveLocation(null)}
                        >
                            <div>
                                <CurrentPlace place={activeLocation} />
                                <button className={styles.mapRoute} onClick={handleRouteCreation(activeLocation)}>Маршрут к месту</button>
                                <button className={styles.mapRoute} onClick={clearRoute}>Удалить маршрут</button>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
        </div>
    );
};

export default Map;

