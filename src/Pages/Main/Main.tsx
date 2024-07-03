import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Filter from '../../components/Filter/Filter';
import PlaceInfo from '../../components/PlaceInfo/PlaceInfo';
import { useUserAuth } from '../../hooks/useUserAuth';

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
                <PlaceInfo />
        </>
    );
};

export default Main;