import React from 'react';
import { FormLogin,  Logo } from '../../components/index';
import style from "./Auth.module.scss";

const Auth = () => {
    return (
        <div className={style.logitContainer}>
            <Logo />
            <FormLogin />
        </div>
    );
};

export default Auth;