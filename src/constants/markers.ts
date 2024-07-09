import plus18 from '../assets/icons/places/18plus.png';
import bank from '../assets/icons/places/bank.png';
import car from '../assets/icons/places/car.png';
import coffee from '../assets/icons/places/coffee.png';
import culture from '../assets/icons/places/culture.png';
import entertaiment from '../assets/icons/places/entertaiment.png';
import food from '../assets/icons/places/food.png';
import gas from '../assets/icons/places/gas.png';
import industrial from '../assets/icons/places/industrial.png';
import nature from '../assets/icons/places/nature.png';
import other from '../assets/icons/places/other.png';
import religion from '../assets/icons/places/religion.png';
import shop from '../assets/icons/places/shop.png';
import sport from '../assets/icons/places/sport.png';

export const categoriesIcons: { [key: string]: string } = {
    restaurant: food,
    park: nature,
    museum: culture,
    bank: bank,
    gas_station: gas,
    night_club: plus18,
    church: religion,
    cemetery: religion,
    amusement_park: entertaiment,
    casino: plus18,
    supermarket: shop,
    parking: car,
    stadium: sport,
    doctor: other,
    gym: sport,
    airport: industrial,
    train_station: industrial,
    subway_station: industrial,
    transit_station: industrial,
    university: other,
    school: other,
    cafe: coffee,
    bakery: food,
    car_wash: car,
    car_rental: car,
    hospital: other,
    secondary_school: other,
    primary_school: other,
    light_rail_station: industrial,
    library: other,
    rv_park: car,
    shopping_mall: shop,
    pharmacy: other,
    police: other
};