import React, { useState } from "react";
import "./FormLogin.scss";

const FormLogin = () => {
    const [date, setDate] = useState({email: null, password: null})
    const handleclick = () => {
        console.log(date);
    }
    return (
        <form className="FormLogin">
            <input
                type="email"
                placeholder="email"
                className="incorrectInput"
                onChange = {(e) => setDate({...date,email: e.target.value})}
            />
            <p>
                The email or password you entered isn’t connected to any
                account. Find your account and log in.
            </p>
            <input
                type="text"
                placeholder="password"
                className="formInputPassword"
                onChange = {(e) => setDate({...date,password: e.target.value})}
            />
            <button type="submit" onClick={() => handleclick()}> Log in </button>
        </form>
    );
};

export default FormLogin;