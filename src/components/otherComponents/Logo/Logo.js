import React from 'react';
import style from "./Logo.module.scss";

const Logo = () => {
    return (
        <div className="logo logo--mobile">
            <span className="logo__logo">logo</span>
            <span className="logo__name">name company</span>
            <span className="logo__motto">Collected everything for you</span>
        </div>
    );
};

export default Logo;