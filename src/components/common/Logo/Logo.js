import React from 'react';
import style from "./Logo.module.scss";

const Logo = () => {
    return (
        <div className={style.Logo}>
            <span className={style.logo__logo}>logo</span>
            <span className={style.logo__name}>name company</span>
            <span className={style.logo__motto}>
                Collected everything for you
            </span>
        </div>
    );
};

export default Logo;