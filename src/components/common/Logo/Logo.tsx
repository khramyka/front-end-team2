import React from 'react';
import "./Logo.scss";

const Logo: React.FC = () => {
    return (
        <div className="Logo">
            <span className="logo__logo">logo</span>
            <span className="logo__name">name company</span>
            <span className="logo__motto">
                Collected everything for you
            </span>
        </div>
    );
};

export default Logo;