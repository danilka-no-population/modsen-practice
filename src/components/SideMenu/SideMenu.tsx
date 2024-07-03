import styles from "./sidemenu.module.scss";
import { useSelector } from "react-redux";
//@ts-ignore
import { RootState } from '../app/store';
import { useEffect, useState } from "react";

interface Place {
    geometry: {
        lat: string | null | undefined | number;
        lng: string | null | undefined | number;
    };
    photos: {
        getUrl: (options: { maxWidth: number; maxHeight: number; }) => any;
    }[];
    name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
}

export const SideMenu = () => {
    const placesList = useSelector((state: RootState) => state.places.places);
    const [places, setPlaces] = useState<Place[]>([]);

    useEffect(() => {
        if (Array.isArray(placesList)) {
            setPlaces(placesList);
        } else {
            console.error('placesList is not an array', placesList);
        }
    }, [placesList]);


    return (
        <div className={styles.placesListContainer}>
        <input type="text" className={styles.searchInput} placeholder="Место, адрес"/>
        <ul key={places.length} >
            {places.map((place: Place, index: number) => (
                <li className={styles.placeCard} key={index + 1}>
                    <div className={styles.placeMiniature}>
                        <img src={place.photos && place.photos[0].getUrl({ maxWidth: 400, maxHeight: 100 })} className={styles.images}/>
                    </div>
                    <p>{place.name}</p>
                </li>
            ))}
        </ul>
        </div>
    );
}