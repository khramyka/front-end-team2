import React, { useRef } from "react";
import  "./SearchBar.scss";
import {
    RatingStar,
    SearchForm,
    ContainerDataPiker,
    MySelect,
    SelectMultiple,
    ControlLabel,
} from "../../index";

const SearchBar =()=>{
    const SearchBarRef = useRef(null);
    const arr = ["aaaaaaa","dddddddddddd,","sssssssssss"];
    
    return (
        <div className="container" ref={SearchBarRef}>
            <div className="close">
                <button
                    className="btn-close"
                    onClick={() => SearchBarRef.current.style.display ="none"}
                ></button>
            </div>
            <SearchForm />
            <ContainerDataPiker />
            <div className="containerFavorite">
                <ControlLabel lable={"Favorite"} />
            </div>

            <div className="rating">
                <span>Rating</span>
                <RatingStar />
            </div>
            <MySelect data={arr} name={"location"} clName={"location"} />
            <SelectMultiple data={arr} clName={"location"} name={"brands"} />
            <SelectMultiple data={arr} clName={"location"} name={"tags"} />
            <SelectMultiple
                data={arr}
                clName={"location"}
                name={"discount size"}
            />
            <button type="submit" className="submit">
                Apply
            </button>
        </div>
    );
};

export default SearchBar;