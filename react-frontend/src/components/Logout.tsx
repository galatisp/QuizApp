import React, { useEffect } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  AuthService.logout();
 
   const navigate = useNavigate();
  console.log("Current User : "+  localStorage.getItem("user"));

 useEffect(() => {

        navigate("/");


    }, []);

  

  return (
    <div className="container">
      <header className="jumbotron">
       
          <div>
            <h3>Αποσυνδέθηκε ο Χρήστης</h3>
            <button onClick={() =>
                 navigate("/")}>Αρχική Σελίδα</button>
        </div>
      </header>
      
    </div>
  );
};

export default Logout;