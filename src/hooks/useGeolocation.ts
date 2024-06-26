import { useEffect, useState } from 'react';
import useGeolocated from 'react-geolocated';

const useGeolocation = () => {
  const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const { coords, isGeolocationEnabled, getCurrentPosition, isGeolocationAvailable } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      setPosition({ lat: coords.latitude, lng: coords.longitude });
    }
  }, [isGeolocationAvailable, isGeolocationEnabled, coords]);

  const getUserPosition = async () => {
    if (navigator.geolocation) {
      await getCurrentPosition();
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return { position, getUserPosition };
};

export default useGeolocation;