import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import SideMenu from '../SideMenu/SideMenu';
import './styles.module.scss';

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
};

interface Place {
  name: string;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
}

export const Map: React.FC = () => {
  const [zoomValue, setZoomValue] = useState<number>(14);
  const [radius] = useState<number>(1000);
  const [buildingType] = useState('museum');
  const [currentPlace, setCurrentPlace] = useState<Place | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyASakd9_-V0Sl-hfufvhF_MFhe0SDnITB0',
    libraries: ['places'],
  });

  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);

  useEffect(() => {
    if (isLoaded) {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));

      const request = {
        location: defaultCenter,
        radius: radius,
        type: buildingType,
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setPlaces(results);
        }
      });
    }
  }, [isLoaded, buildingType]);

  const showCurrentPlace = (place: Place) => {
    setCurrentPlace(place);
    setZoomValue(20);
  };

  console.log(showCurrentPlace.name);
  

  if (loadError) return <div>Ошибка загрузки карты</div>;
  if (!isLoaded) return <div>Загрузка карты...</div>;

  return (
    <div className="map-container">
      <div className="map-wrapper">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={zoomValue}
          center={
            currentPlace
              ? {
                  lat: currentPlace.geometry.location.lat(),
                  lng: currentPlace.geometry.location.lng(),
                }
              : defaultCenter
          }
          options={options}
        >
          {places.map((place, index) => (
            <Marker
              key={index}
              position={{
                lat: place.geometry?.location?.lat() || defaultCenter.lat,
                lng: place.geometry?.location?.lng() || defaultCenter.lng,
              }}
            />
          ))}
        </GoogleMap>
      </div>
      <SideMenu />
    </div>
  );
};
