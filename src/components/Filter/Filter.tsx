import React, { useState } from "react";
import styles from './filter.module.scss';
import { useDispatch } from 'react-redux';
import { setFilter } from "../../store/reducers/filterSlice";
import { useTypeState } from "../../hooks/useTypeState";

const Filter: React.FC = () => {
    const dispatch = useDispatch();
    const currentBuildingType = useTypeState(state => state.filter.buildingType);
    const currentRadius = useTypeState(state => state.filter.radius);

    const [buildingType, setBuildingType] = useState(currentBuildingType);
    const [radius, setRadius] = useState(currentRadius);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBuildingType(event.target.value);
        setRadius('1000');
    };

    const handleClick = () => {
        dispatch(setFilter({ buildingType, radius }));
    };

    return (
        <div className={styles.filterWrapper}>
            <input 
                type="text" 
                className={styles.searchField} 
                placeholder="Место, адрес..."
            />
            <div className={styles.controls}>
                <select 
                    className={styles.select}
                    value={buildingType}
                    onChange={handleChange}
                >
                    <option value="point_of_interest">Интересные места</option>
                    <option value="museum">Музеи</option>
                    <option value="park">Парки</option>
                </select>
                <button 
                    className={styles.searchButton}
                    onClick={handleClick}
                >
                    Найти
                </button>
            </div>
        </div>
    );
};

export default Filter;

// import React from 'react';
// import styles from './filter.module.scss';

// type PlaceType = 'restaurant' | 'museum' | 'park';

// type FilterPanelProps = {
//     radius: number;
//     placeType: PlaceType;
//     onRadiusChange: (value: number) => void;
//     onPlaceTypeChange: (value: Place | string) => void;
// };

// const FilterPanel: React.FC<FilterPanelProps> = ({ radius, placeType, onRadiusChange, onPlaceTypeChange }) => {
//     const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = parseInt(e.target.value, 10);
//         onRadiusChange(value);
//     };

//     const handlePlaceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const value = e.target.value as PlaceType;
//         onPlaceTypeChange(value);
//     };

//     return (
//         <div className={styles.container}>
//             <div className="card-body">
//                 <h2 className="card-title">Фильтры</h2>
//                 <div className="form-group">
//                     <label>Радиус поиска (м)</label>
//                     <input type="number" className="form-control" value={radius} onChange={handleRadiusChange} />
//                 </div>
//                 <div className="form-group">
//                     <label>Тип заведения</label>
//                     <select className="form-control" value={placeType} onChange={handlePlaceTypeChange}>
//                         <option value="restaurant">Ресторан</option>
//                         <option value="museum">Музей</option>
//                         <option value="park">Парк</option>
//                     </select>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FilterPanel;