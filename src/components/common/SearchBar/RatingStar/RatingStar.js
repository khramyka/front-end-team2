import React, { useState } from "react";
import {Star, StarBorder} from '@material-ui/icons';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        color: "#F4E44D",
        cursor: "pointer"
    },
});

const RatingStar = () => {
    const [starArr, setStarArr] = useState([
        { star: StarBorder, number: 0 },
        { star: StarBorder, number: 1 },
        { star: StarBorder, number: 2 },
        { star: StarBorder, number: 3 },
        { star: StarBorder, number: 4 },
    ]);
    
    const heandleClick = (number) =>{
        const newStarArr =starArr.map((star) => {
                number >= star.number
                    ? (star.star = Star)
                    : (star.star = StarBorder);
                    return star;
        });
        setStarArr(newStarArr);
    }

    const classes = useStyles();
    return (
        <div className={classes.root}>
            {starArr.map((star) => (
                <star.star onClick={() => heandleClick(star.number)} />
            ))}
        </div>
    );
};

export default RatingStar;