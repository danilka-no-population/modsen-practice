import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../../firebaseConfig';
import { setUser } from '../../store/reducers/userSlice';
import styles from './register.module.scss';

const RegisterPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const [againPass, setAgainPass] = useState('');

    const handleSubmitRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (pass === againPass) {
            try {
                const userCredential = await createUser(login, pass);
                const user = userCredential.user;
                //@ts-ignore
                dispatch(setUser({ email: user.email ? user.email : '', token: user.accessToken, id: user.uid }));
                navigate("/");
            } catch (error) {
                console.error("Error creating user:", error);
            }
        } else {
            console.error("Passwords do not match.");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.formWrapper}>
                <p className={styles.title}>Создать аккаунт</p>
                <form onSubmit={handleSubmitRegister}>
                    <input
                        className={styles.inputField}
                        type="text"
                        placeholder="Введите e-mail"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <input
                        className={styles.inputField}
                        type="password"
                        placeholder="Введите пароль"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <input
                        className={styles.inputField}
                        type="password"
                        placeholder="Повторите пароль"
                        value={againPass}
                        onChange={(e) => setAgainPass(e.target.value)}
                    />
                    <button className={styles.submitButton} type="submit">Зарегистрироваться</button>
                </form>
                <Link to='/login' className={styles.registerLink}>
                        Войти
                </Link>
            </div>
        </div>
    );
}

export default RegisterPage;
