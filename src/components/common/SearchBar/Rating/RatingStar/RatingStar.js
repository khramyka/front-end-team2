import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        color: "#F4E44D",
        cursor: "pointer"
    },
});

const RatingStar = ({ starArr}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {starArr.map((Star, i) => 
                <Star data-key={i} key={i}/>
            )}
        </div>
    );
};

export default RatingStar;