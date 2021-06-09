import React from 'react';

import { DateValid, Discount, Like, Map, Submitbutton, VendorLogo } from "../index";

const ExtendedCard = () => {
    return (
        <div>
            <VendorLogo />
            <Discount />
            <DateValid />
            <Like />
            <Map/>
            <Submitbutton/>
        </div>
    );
};

export default ExtendedCard;