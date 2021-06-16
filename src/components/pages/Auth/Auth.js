import React from 'react';
import { FormLogin,  Logo } from '../../index';
import  "./Auth.scss";

const Auth = () => {
    return (
        <div className="LogitContainer">
            <div className="container">
                <Logo />
                <FormLogin />
            </div>
        </div>
    );
};

export default Auth;