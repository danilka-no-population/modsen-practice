import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Filter from '../../components/Filter/Filter';
import { useUserAuth } from '../../hooks/useUserAuth';
import Favourites from '../Favourites/Favourites';

const Main: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useUserAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
                <Filter />
                <Routes>
                    <Route path="/favorites" element={<Favourites/>} />
                </Routes>
        </>
    );
};

export default Main;