import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    return (
        <div>
            <h1>Register</h1>
            <p>Or <Link to="/login">login</Link></p>
            <Link to="/">Going to main page</Link>
        </div>
    );
};

export default RegisterPage;