//Routes 

import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    Outlet,
} from "react-router-dom";

import Login from "./components/Login";

import Logout from "./components/Logout";
import Profile from "./components/Profile";
import Quiz from "./quiz/Quiz";
import ShowQuestions from "./quiz/ShowQuestions";
import UploadQuestions from "./admin/UploadQuestions";
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';
import AuthService from "./services/auth.service";


// Home Page Component
const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Αρχική Σελίδα</h2>
            <button onClick={() =>
                navigate("/quiz")}>Έναρξη Quiz</button>
        </div>
    );
};

const logOut = () => {
    AuthService.logout();
};



function App() {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);

    return (
        <Router>

            <nav>
                <ul>
                    <li>
                        <Link to="/">Αρχική</Link>
                    </li>
                    <li>
                        <Link to="/quiz">Quiz</Link>
                    </li>
                    {/* Show Admin Page only to Admins */}
                    {showAdminBoard && (
                        <li>
                            <Link to={"/upload-questions"} >
                                Φόρτωση Ερωτήσεων
                            </Link>
                        </li>
                    )}
                    {/* Show Logout/Login  */}
                    {currentUser ? (


                        <li className="nav-item">
                            <a href="/logout" onClick={logOut}>
                                LogOut
                            </a>
                        </li>

                    ) : (

                        <li className="nav-item">
                            <Link to={"/login"}>
                                Login
                            </Link>
                        </li>



                    )}


                </ul>
            </nav>


            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/questions" element={<ShowQuestions />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/upload-questions" element={<UploadQuestions />} />
            </Routes>
        </Router>
    );
}

export default App;
