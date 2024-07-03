import React from 'react';

const favouritePlaces = [
    { id: 1, name: "Нацыянальны гістарычны музей Рэспублікі Беларусь", description: "Описание позже..." },
    { id: 2, name: "Галерея современного искусства «Ў»", description: "Описание позже..." },
    { id: 3, name: "Нацыянальны мастацкі музей", description: "Описание позже..." },
    { id: 4, name: "Музей футбола, и истории стадиона Динамо", description: "Описание позже..." },
    { id: 5, name: "Музей истории Белорусской железной дороги", description: "Описание позже..." }
];

const Favourites: React.FC = () => {
    return (
        <div>
            <h2>Favourite Places</h2>
            <ul>
                {favouritePlaces.map((place) => (
                    <li key={place.id}>
                        <h3>{place.name}</h3>
                        <p>{place.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favourites;
