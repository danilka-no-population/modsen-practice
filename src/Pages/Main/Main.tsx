import React from "react";
import {Header} from "../../components/Header/Header";
import {Map} from "../../components/Map/Map";
import { useNavigate, Link } from 'react-router-dom';

export const Main = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }
    const handleRegister = () => {
        navigate('/register')
    }
    return(
        <React.Fragment>
            {/* <Header /> */}
            <Map/>
            <h3>Login</h3>
            <button onClick={handleLogin}>Login</button>
            <h3>Register</h3>
            <button onClick={handleRegister}>Register</button>
        </React.Fragment>
    );
}