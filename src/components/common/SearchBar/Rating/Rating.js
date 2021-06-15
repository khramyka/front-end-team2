import React, {useState} from "react";
import "./Rating.scss";
import RatingStar from "./RatingStar/RatingStar";
import { Star, StarBorder } from "@material-ui/icons";

const Rating = () => {
    const [starArr, setStarArr] = useState([
        StarBorder,
        StarBorder,
        StarBorder,
        StarBorder,
        StarBorder,
    ]);

    const installStarBorder = (e) => { 
        let newStarArr;
        if ("svg" === e.target.tagName) {
            newStarArr=starArr.map((star, i) => {
                e.target.dataset.key >= i ? (star = Star) : (star = StarBorder);
                return star;
            });
        } else{
            newStarArr = starArr.map((star) => {
            star = StarBorder;
            return star;
        });
        }
        setStarArr(newStarArr);
    };
    
    return (
        <div className="rating" onClick={(e) => installStarBorder(e)}>
            <span>Rating</span>
            <RatingStar starArr={starArr} />
        </div>
    );
};

export default Rating;
