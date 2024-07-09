import {useState} from "react";
import { useDispatch } from 'react-redux';
import { setFilter } from "../../store/slices/filterSlice";
import styles from './filter.module.scss'
// @ts-ignore
import { RootState } from '../app/store';
import { useAppSelector } from "../../hooks/useAppSelector";
import {MarkersList} from '../../assets/icons/places';
import searchIcon from "../../assets/icons/search.svg";

const Filter = () => {
    const dispatch = useDispatch();
    const [buildingType, setBuildingType] = useState(useAppSelector((state) => state.filter.buildingType));
    const [radius, setRadius] = useState(useAppSelector((state) => state.filter.radius));
    const [name, setName] = useState(useAppSelector((state) => state.filter.name));
    const optionsList = MarkersList;
    const handleFilterChange = (key: string) => {
        setBuildingType(key);
    };

    const handleButtonClick = () => {
        dispatch(setFilter({ buildingType, radius, name }));
    };

    return (
            <div className={styles.filterWrapper}>
                <input placeholder="Место, адрес..." onChange={(e) => setName(e.target.value)} className={styles.searchField}/>
                    <div className={styles.scrollableList}>
                        {
                            Object.entries(optionsList).map(([key, [icon, label]]) => (
                                <div className={`${styles.option} ${buildingType === key ? styles.selected : ''}`}
                                    onClick={() => handleFilterChange(key)}
                                >
                                    <img className={styles.icon} src={icon} alt={key}/>
                                    <option value={key}>
                                        {label}
                                    </option>
                                </div>
                            ))
                        }
                    </div>
                <div className={styles.radiusWrapper}>
                        <input className={styles.radiusInput} placeholder="Радиус" onChange={(e) => setRadius(parseInt(e.target.value) * 1000)}/>
                        <label className={styles.textLabel}>км</label>
                </div>
                    <button className={styles.searchButton} onClick={handleButtonClick} style={{width: '110%'}}>
                        <img src={searchIcon}/>
                    </button>
            </div>
    );
};

export default Filter