import Header from "./components/Header/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import Map from "./components/Map/Map";
import LoginPage from "./Pages/Login/LoginPage";
import "./App.css";
import Main from "./Pages/Main/Main";
import RegisterPage from "./Pages/Register/RegisterPage";
import { useEffect, useState } from "react";
import { useUserAuth } from "./hooks/useUserAuth";
import Favourites from "./Pages/Favourites/Favourites";

function App() {
    const navigate = useNavigate();
    const { isAuthenticated } = useUserAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return isAuthenticated ? (
        <>
            <Header />
            <div className={`container ${isSidebarOpen ? 'open' : 'closed'}`}>
                <Routes>
                    <Route path="/*" element={<Main />} />
                    <Route path="/favorites" element={<Favourites />} />
                </Routes>
            </div>
            <button className={`toggle-button ${isSidebarOpen ? 'open' : 'closed'}`} onClick={toggleSidebar}>
                {isSidebarOpen ? '🡄' : '🡆'}
            </button>
            <Map />
        </>
    ) : (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    );
}

export default App;



