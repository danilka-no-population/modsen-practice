import bankIcon from '../places/bank.png';
import cafeIcon from '../places/coffee.png';
import shopIcon from '../places/shop.png';
import natureIcon from '../places/nature.png';
import museumIcon from '../places/culture.png';
import restaurantIcon from '../places/food.png';
import gasIcon from '../places/gas.png';



export const MarkersList: { [key: string]: [string, string] } = {
    restaurant: [restaurantIcon, 'Рестораны'],
    park: [natureIcon, 'Парки'],
    museum: [museumIcon, 'Музеи'],
    cafe: [cafeIcon, 'Кафе'],
    bank: [bankIcon, 'Банки'],
    supermarket: [shopIcon, 'Супермаркеты'],
    gas_station: [gasIcon, 'Заправки']
};