import React from 'react';
import { FormLogin,  Logo } from '../../index';
import "./Auth.scss";

const Auth:React.FC = () => {
    return (
        <div className={"LogitContainer"}>
            <div className={"container__login"}>
                <Logo />
                <FormLogin />
            </div>
        </div>
    );
};

export default Auth;