import React from 'react';
import { FormLogin,  Logo } from '../components';

const Auth = () => {
    return (
        <div
            className="logitContainer"
            style={{ height: window.innerHeight - 50 }}
        >
            <Logo />
            <FormLogin />
        </div>
    );
};

export default Auth;