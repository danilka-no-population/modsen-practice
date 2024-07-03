import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../store/reducers/userSlice';
import projectLogo from '../../assets/icons/logo.svg';
import searchIcon from '../../assets/icons/searchbtn.svg';
import favoriteIcon from '../../assets/icons/fav.svg';
import userIcon from '../../assets/icons/user_icon.svg';
import logoutIcon from '../../assets/icons/logout.svg';
import { useUserAuth } from '../../hooks/useUserAuth';
import styles from './header.module.scss';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useUserAuth();

    const handleLogout = () => {
        dispatch(clearUser());
    };

    return (
        <header className={styles.header}>
            <img src={projectLogo} alt="Logo" className={styles.logo} />
            <nav className={styles.nav}>
                <NavLink to='/' className={styles.navLink}>
                    <img src={searchIcon} alt="Search" className={styles.icon} />
                </NavLink>
                <NavLink to='/favorites' className={styles.navLink}>
                    <img src={favoriteIcon} alt="Favorites" className={styles.icon} />
                </NavLink>
                <button className={styles.iconButton} onClick={handleLogout}>
                    <img src={isAuthenticated ? logoutIcon : userIcon} alt={isAuthenticated ? "Logout" : "User"} />
                </button>
            </nav>
        </header>
    );
};

export default Header;
