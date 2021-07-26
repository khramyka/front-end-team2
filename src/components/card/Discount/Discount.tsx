import React from 'react';
import './Discount.scss'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import LocationOnIcon from '@material-ui/icons/LocationOn';
interface DiscountProps {
    discount: {
        place: string,
        nameDiscount: string,
        sizeDiscount: string,
        date: string
    },
    handleClick: (e: any) => void
}


const Discount: React.FC<DiscountProps> = ({ discount, handleClick }) => {
    const date = new Date(discount.endDate * 1000);
    const {vendorLocations} = discount;
    const location = vendorLocations.map(item => Object.values(item).splice(0,3).join(" "));
     
    

    return (

            <div className="discount" onClick={handleClick}>

                <h1 className="discount__title">{discount.name}</h1>
                <div className="discount__info">
                    <strong className="discount__size">{`-${discount.percentage}%`}</strong>
                    off
                </div>
                <div className="discount__date">
                    Valid until {date.toLocaleDateString()}
                </div>
                <div className="discount__place">
                    <><LocationOnIcon style={{color: "red"}}/>{ (location[0])}</>
                </div>
            </div>

    );
};

export default Discount;