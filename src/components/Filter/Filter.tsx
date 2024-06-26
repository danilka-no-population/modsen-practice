import React, {useState} from "react";

interface FilterProps {
    onFilter: (selectedCategory: string) => void;
}

export const Filter: React.FC<FilterProps> = ({ onFilter }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('point_of_interest');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const handleButtonClick = () => {
        onFilter(selectedCategory);
        console.log(selectedCategory)
    };

    return (
        <>
            <select
                name={'category'}
                value={selectedCategory}
                onChange={handleSelectChange}
            >
                <option value="point_of_interest">Интересные места</option>
                <option value="museum">Музеи</option>
                <option value="park">Парки</option>
                <option value="zoo">Зоопарки</option>
                <option value="art_gallery">Галереи</option>
                <option value="tourist_attraction">Достопримечательности</option>
            </select>
            <button onClick={handleButtonClick}>
                <p>Найти</p>
            </button>
        </>
    );
};