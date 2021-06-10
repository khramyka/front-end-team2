import React from 'react';
import { FormLogin,  Logo } from '../../components/index';
import style from "./Auth.module.scss";

const Auth = () => {
    return (
        <div className={style.LogitContainer}>
            <div className={style.container}>
                <Logo />
                <FormLogin />
            </div>
        </div>
    );
};

export default Auth;