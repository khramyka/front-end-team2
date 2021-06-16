import React from 'react';
import "./Logo.scss";
import logoCompany from "../../../images/header/Group 203.png"

const Logo = () => {
    return (
        <div className={"Logo"}>
            <span className={"logo__logo"}><img src={logoCompany} alt=""/></span>
            <span className={"logo__name"}>EXA COUPONS</span>
            <span className={"logo__motto"}>
                Collected everything for you
            </span>
        </div>
    );
};

export default Logo;