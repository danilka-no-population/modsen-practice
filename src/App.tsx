import Header from "./components/Header/Header";
import {Routes, Route, useNavigate} from "react-router-dom";
import Map from "./components/Map/Map";
import LoginPage from "./Pages/Login/LoginPage";
import "./App.css";
import Main from "./Pages/Main/Main";
import RegisterPage from "./Pages/Register/RegisterPage";
import {Fragment, useEffect} from "react";
import { useUserAuth } from "./hooks/useUserAuth";
import Favourites from "./Pages/Favourites/Favourites";

function App() {

    const navigate = useNavigate();
    // @ts-ignore
    const { isAuthenticated } = useUserAuth();

    useEffect(() => {
        if(!isAuthenticated){
            navigate("/login");
        }
    }, [isAuthenticated])

    return isAuthenticated ? (
        <Fragment>
            <Header />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Main />} />
                    </Routes>
                </div>
            <Map />
        </Fragment>
    ) : (
            <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/favorites" element={<Favourites />} />
            </Routes>
    );
}

export default App