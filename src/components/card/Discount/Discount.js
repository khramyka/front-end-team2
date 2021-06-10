import React from 'react';
import './Discount.scss'

const Discount = () => {
    return (
        <div className="discount">
           <h1 className="discount__title">Mi-mi store</h1>
            <div className="discount__info">
                <strong className="discount__size">50% </strong>
                off
            </div>
            <div className="discount__date">
                Valid until 05 May 2021
            </div>
            <div className="discount__place">
                Yakuba Kolasa St,37
            </div>
        </div>
    );
};

export default Discount;