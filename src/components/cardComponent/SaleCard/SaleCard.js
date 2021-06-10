import React from 'react';
import { DateValid, Discount, Like, VendorLogo } from '../../index';
import style from "./SaleCard.module.scss";

const SaleCard = () => {
    return (
        <div>
           <VendorLogo/>
           <Discount/>
           <DateValid/>
           <Like/>
        </div>
    );
};

export default SaleCard;