import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../firebaseConfig";
import { setUser } from "../../store/reducers/userSlice";
import styles from "./login.module.scss";

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const userCredential = await signInUser(email, password);
            const user = userCredential.user;
            //@ts-ignore
            dispatch(setUser({ email: user.email ?? '', token: user.accessToken, id: user.uid }));
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.formWrapper}>
                <p className={styles.title}>Войти в аккаунт</p>
                <form onSubmit={handleLogin}>
                    <input
                        className={styles.inputField}
                        type="email"
                        placeholder="Введите e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className={styles.inputField}
                        type="password"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className={styles.submitButton} type="submit">Войти</button>
                </form>
                <Link to="/register" className={styles.registerLink}>Регистрация</Link>
            </div>
        </div>
    );
}

export default LoginPage;
