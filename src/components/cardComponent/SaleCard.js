import React from 'react';
import { DateValid, Discount, Like, VendorLogo } from '../index';

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