import React from 'react';
import styles from './favourites.module.scss';

const favouritePlaces = [
    { id: 1, name: "Нацыянальны гістарычны музей Рэспублікі Беларусь", description: "Описание позже..." },
    { id: 2, name: "Галерея современного искусства «Ў»", description: "Описание позже..." },
    { id: 3, name: "Нацыянальны мастацкі музей", description: "Описание позже..." },
    { id: 4, name: "Музей футбола, и истории стадиона Динамо", description: "Описание позже..." },
    { id: 5, name: "Музей истории Белорусской железной дороги", description: "Описание позже..." }
];

const Favourites: React.FC = () => {
    return (
        <div className={styles.filterWrapper}>
            <input 
                type="text" 
                className={styles.searchField}
                placeholder="Место, адрес..."
            />
            <p className={styles.textLabel}>Избранное:</p>
            <ul className={styles.list}>
                {favouritePlaces.map((place) => (
                    <li key={place.id} className={styles.elementWrapper}>
                        <h3>{place.name}</h3>
                        <p>{place.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favourites;
