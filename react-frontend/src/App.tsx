//Routes 

import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    Outlet,
} from "react-router-dom";

import Quiz from "./quiz/Quiz";
import ShowQuestions from "./quiz/ShowQuestions";

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

// About Page Component 
const About = () => (
    <div>
        <h2>About Page</h2>
        <nav>
            <ul>
                <li>
                    <Link to="team">Our Team</Link>
                </li>
                <li>
                    <Link to="company">Our Company</Link>
                </li>
            </ul>
        </nav>
        <Outlet />
    </div>
);

// Components for other pages

const Team = () => <h2>Team Page</h2>;
const Company = () => <h2>Company Page</h2>;

function App() {
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
                     <li>
                        <Link to="/questions">Questions</Link>
                    </li>
                    {/* <li>
                        <Link to="/about">About</Link>
                    </li> */}
                    
                </ul>
            </nav>
            {/*Implementing Routes for respective Path */}
            <Routes>
                <Route path="/" element={<Home />} />
                 <Route path="/quiz" element={<Quiz />} />
                 <Route path="/questions" element={<ShowQuestions />} />
                {/* <Route path="/about" element={<About />}>
                    <Route path="team" element={<Team />} />
                    <Route path="company" element={<Company />} />
                </Route> */}
               
            </Routes>
        </Router>
    );
}

export default App;
