import React from 'react';

const FormLogin = () => {
    return (
        <form className="form-login">
            <input
                type="email"
                placeholder="email"
                className="incorrect__input"
            />
            <p>
                The email or password you entered isn’t connected to any account.
                Find your account and log in.
            </p>
            <input type="text" placeholder="password" className="form__input-password"/>
            <button type="submit"> Log in </button>
        </form>
    );
};

export default FormLogin;