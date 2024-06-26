import React, { useState } from 'react';
import styles from './sidemenu.module.scss';
import Search from '../Search/Search';
import FavouriteList from '../Favourites/FavouriteList';

const SideMenu: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);


  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsExpanded(true);
    setIsFavoritesOpen(false);
  };

  const toggleFavorites = () => {
    setIsFavoritesOpen(!isFavoritesOpen);
    setIsExpanded(true);
    setIsSearchOpen(false);
  };

  return (
    <div className={styles.sideMenu}>
      <h2>Меню</h2>
      <input type="search" placeholder='Место, адрес' className={styles.searchInput} />
      <button className={styles.menuButton} onClick={toggleSearch}>
        Поиск
      </button>
      <button className={styles.menuButton} onClick={toggleFavorites}>
        Избранное
      </button>
      <div className={`${styles.menuContent} ${isExpanded ? styles.expanded : ''}`}>
        {isSearchOpen && <Search />}
        {isFavoritesOpen && <FavouriteList />}
      </div>
    </div>
  );
};

export default SideMenu;
