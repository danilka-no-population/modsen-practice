import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { mapStyleArr } from "./map.styles";
import styles from "./styles.module.scss";
//@ts-ignore
import { RootState } from '../app/store';
import { useTypeState } from "../../hooks/useTypeState";
import {setPlacesList} from "../../store/reducers/placeSlice";

const OPTIONS = { disableDefaultUI: true, zoomControl: true, styles: mapStyleArr };
const CENTER = { lat: 53.89148473951982, lng: 27.56005834796063 };
const MAP_STYLES = { width: '100%', height: '100vh' };

const Map: React.FC = () => {
    const filters = useTypeState((state) => state.filter);
    const dispatch = useDispatch();

    const [zoomVal, setZoomVal] = useState<number>(14);
    const [curPlace, setCurPlace] = useState<Place>();
    const [places, setPlaces] = useState<Place[]>([]);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyA3-398eAttT4Mb_TRfUyHfI9U0lwL7V3c',
        libraries: ['places'],
    });

    useEffect(() => {
        if (isLoaded) {
            const service = new google.maps.places.PlacesService(
                document.createElement('div')
            );

            let request = {
                location: CENTER,
                radius: filters.radius,
                type: [filters.buildingType]
            };
            // @ts-ignore
            service.nearbySearch(request, (results: Place[], status: google.maps.places.PlacesServiceStatus) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    setPlaces(results);
                    dispatch(setPlacesList(results));
                } else {
                    console.error('Some error:', status);
                }
            });

        }

    }, [isLoaded, filters]);


    useEffect(() => {

        if (curPlace) {
            setZoomVal(18);
        }
    }, [curPlace]);

    if (loadError) return <div>Ошибка загрузки карты</div>;
    if (!isLoaded) return <div>Загрузка карты...</div>;

    return (
        <div className={styles.mapContainer}>
            <div className={styles.mapWrapper}>
                <GoogleMap
                    mapContainerStyle={MAP_STYLES}
                    zoom={zoomVal}
                    center={
                        curPlace
                            ? {
                                lat: curPlace.geometry.location.lat(),
                                lng: curPlace.geometry.location.lng(),
                            }
                            : CENTER
                    }
                    options={OPTIONS}
                >
                    {places.map((place, index) => (
                        <Marker
                            key={index}
                            position={{
                                lat: place.geometry.location.lat(),
                                lng: place.geometry.location.lng(),
                            }}
                            onClick={() => setCurPlace(place)}
                        />

                    ))}
                </GoogleMap>
            </div>
        </div>
    );
};

export default Map;