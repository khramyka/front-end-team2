import React from 'react';
import { DateValid, Discount, Like, VendorLogo } from '../../index';
import './SaleCard.scss'

const SaleCard = () => {
    return (
        <div className="sale-card">
           <VendorLogo/>
           <Discount/>
           <Like/>
        </div>
    );
};

export default SaleCard;