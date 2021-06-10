import React from 'react';
import style from "./FormLogin.module.scss";

const FormLogin = () => {
    return (
        <form className={style.FormLogin}>
            <input
                type="email"
                placeholder="email"
                className={style.incorrectInput}
            />
            <p>
                The email or password you entered isn’t connected to any
                account. Find your account and log in.
            </p>
            <input
                type="text"
                placeholder="password"
                className={style.formInputPassword}
            />
            <button type="submit"> Log in </button>
        </form>
    );
};

export default FormLogin;