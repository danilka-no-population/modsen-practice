import plus18 from '../assets/icons/18plus.png';
import bank from '../assets/icons/bank.png';
import car from '../assets/icons/car.png';
import coffee from '../assets/icons/coffee.png';
import culture from '../assets/icons/culture.png';
import entertaiment from '../assets/icons/entertaiment.png';
import food from '../assets/icons/food.png';
import gas from '../assets/icons/gas.png';
import industrial from '../assets/icons/industrial.png';
import nature from '../assets/icons/nature.png';
import other from '../assets/icons/other.png';
import religion from '../assets/icons/religion.png';
import shop from '../assets/icons/shop.png';
import sport from '../assets/icons/sport.png';

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