import React, { useRef } from "react";
import  "./SearchBar.scss";
import {
    SearchForm,
    MySelect,
    SelectMultiple,
    ControlLabel,
    Category,
    ContainerDataPiker,
    Submitbutton
} from "../../index";
import {firsLetterToUpperCase} from "../../../helpers/functionHelpers";
import {useLocation} from "react-router-dom";
import {STATISTIC_ROUTE} from "../../../utils/consts"

const SearchBar =()=>{
    const {pathname} = useLocation();
    const SearchBarRef:any = useRef();
    const arr: string[] = ["aaaaaaa","dddddddddddd","sssssssssss"].map(item=>firsLetterToUpperCase(item));
    const arr2: string[] = ["ffffff","gggggggggggg","zzzzzzzzzzz"].map(item=>firsLetterToUpperCase(item));

     const className = pathname === STATISTIC_ROUTE? "container-searchbar modal-searchBar": "container-searchbar"
    return (
        <div className={className}   ref={SearchBarRef}>
            <SearchForm />
            {pathname !== STATISTIC_ROUTE && <div className="containerFavorite">
                <ControlLabel lable={"Favorite"} />
            </div>}
            <Category data={arr2} clName={"location"} name={"Location"} />
            <SelectMultiple data={arr} clName={"location"} name={"Vendor"} setArrTag={null}/>
            <Category data={arr2} clName={"location"} name={"Category"} />
            {pathname === STATISTIC_ROUTE &&  <SelectMultiple data={arr} clName={"location"} name={"User"} setArrTag={null}/>}
            {pathname === STATISTIC_ROUTE &&  <ContainerDataPiker/>}
            <Submitbutton name={"Apply"} heandekCklik={(e:any)=>{}} classN={"submit"}/>
        </div>
    );
};

export default SearchBar;