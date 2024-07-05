import React, { useState } from "react";
import styles from './filter.module.scss';
import { useDispatch } from 'react-redux';
import { setFilter } from "../../store/reducers/filterSlice";
import { useTypeState } from "../../hooks/useTypeState";

import plus18 from '../../assets/icons/18plus.png';
import culture from '../../assets/icons/culture.png';
import entertaiment from '../../assets/icons/entertaiment.png';
import food from '../../assets/icons/food.png';
import industrial from '../../assets/icons/industrial.png';
import nature from '../../assets/icons/nature.png';
import other from '../../assets/icons/other.png';
import religion from '../../assets/icons/religion.png';
import shop from '../../assets/icons/shop.png';
import sport from '../../assets/icons/sport.png';
import searchbtn from '../../assets/icons/search.svg';

const Filter: React.FC = () => {
    const dispatch = useDispatch();
    const currentBuildingType = useTypeState(state => state.filter.buildingType);
    const currentRadius = useTypeState(state => state.filter.radius);

    const [buildingType, setBuildingType] = useState(currentBuildingType);
    const [radius, setRadius] = useState(currentRadius);

    const handleChange = (type: string) => {
        setBuildingType(type);
        setRadius('1000');
    };

    const handleClick = () => {
        dispatch(setFilter({ buildingType, radius }));
    };

    const options = [
        { value: "park", label: "Природа", icon: nature },
        { value: "museum", label: "Культура", icon: culture },
        { value: "restaurant", label: "Рестораны", icon: food },
        { value: "casino" || "night_club", label: "Для взрослых", icon: plus18 },
        // { value: "culture", label: "Культура", icon: culture },
        { value: "gym", label: "Спорт", icon: sport },
        { value: "amusement_park", label: "Развлечения", icon: entertaiment },
        { value: "church", label: "Религия", icon: religion },
        { value: "all", label: "Разное", icon: other },
        { value: "subway_station", label: "Индустриальные объекты", icon: industrial },
        { value: "supermarket", label: "Магазины", icon: shop }
    ];

    return (
        <div className={styles.filterWrapper}>
            <input 
                type="text" 
                className={styles.searchField} 
                placeholder="Место, адрес..."
            />
            <div className={styles.controls}>
                <p className={styles.textLabel}>Искать:</p>
                <div className={styles.scrollableList}>
                    {options.map(option => (
                        <div 
                            key={option.value} 
                            className={`${styles.option} ${buildingType === option.value ? styles.selected : ''}`}
                            onClick={() => handleChange(option.value)}
                        >
                            <img className={styles.icon} src={option.icon}/>
                            <span className={styles.label}>{option.label}</span>
                        </div>
                    ))}
                </div>
                </div>
                    <button 
                        className={styles.searchButton}
                        onClick={handleClick}
                    >
                        <img src={searchbtn}/>
                    </button>
        </div>
    );
};

export default Filter;
