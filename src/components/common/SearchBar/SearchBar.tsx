import React, {useState, useEffect} from "react";
import  "./SearchBar.scss";
import {
    SearchForm,
    MySelect,
    SelectMultiple,
    ControlLabel,
    ContainerDataPiker,
    Submitbutton
} from "../../index";
import {firsLetterToUpperCase} from "../../../helpers/functionHelpers";
import {useLocation} from "react-router-dom";
import {STATISTIC_ROUTE, HISTORY_ROUTE, MAIN_ROUTE} from "../../../utils/consts";
import {useAppSelector} from "../../../store/Redux-toolkit-hook";
import { makeStyles } from "@material-ui/core/styles";
import { t } from 'ttag';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 8
    },

}));


const SearchBar =()=>{
    const {category} = useAppSelector(state=>state.filters);
    const {vendorLocation} = useAppSelector(state=>state.filters);
    const {vendor} = useAppSelector(state=>state.filters);
    const [ableSubCategory, setAbleSubCategory] = useState<String>("");
    const [ableCity, setAbleCyti] = useState();
    const [choiceCity, setChoiceCity] = useState<string[]>([])
    useEffect(()=>{
       setChoiceCity(vendorLocation?.filter(item=>item.country === ableCity).map(item=>firsLetterToUpperCase(item.city)));
    },[ableCity])
    const {pathname} = useLocation();
    const classes = useStyles()

    const [stateControlLabel, setStateControlLabel] = useState({
        "Favorite": false,
        "Used": false,
        "Active": false,
        "Not Activ": false,
        "For all period": false
    });
    const setStateControlLableMy = (name: string, state:boolean) =>{
        setStateControlLabel({...stateControlLabel, [name]: state})
    }
    const arr: string[] = ["aaaaaaa","dddddddddddd","sssssssssss"].map(item=>firsLetterToUpperCase(item));

    const arrVendorName =vendor?.map(item=>firsLetterToUpperCase(item.name));
    const arrCountry = vendorLocation?.map(item=>firsLetterToUpperCase(item.country))
    const uniqueArr = (arr:string[]) => Array.from(new Set(arr));
    const categoryArr = category?.filter((item: any)=> item.deleted === false).map(item=> firsLetterToUpperCase(item.name));
    const className = pathname === STATISTIC_ROUTE || pathname === HISTORY_ROUTE ? "container-searchbar modal-searchBar": "container-searchbar"
    return (
        <div className={classes.root}>
        <div className={className} >
            <SearchForm />
            {pathname !== STATISTIC_ROUTE && <div className="containerFavorite">
                <ControlLabel lable={t`Favorite`} setStateControlLableMy={setStateControlLableMy}/>
                {pathname===HISTORY_ROUTE &&  <>
                <ControlLabel lable={t`Used`} setStateControlLableMy={setStateControlLableMy}/>
                <ControlLabel lable={t`Active`} setStateControlLableMy={setStateControlLableMy}/>
                <ControlLabel lable={t`Not Active`} setStateControlLableMy={setStateControlLableMy} />
                <ControlLabel lable={t`For all period`} setStateControlLableMy={setStateControlLableMy}/>
                </>}
            </div>}
            {pathname !== HISTORY_ROUTE && <>
                <MySelect data={arrCountry? uniqueArr(arrCountry): []} clName={"location"} name={t`Country`} setAble={setAbleCyti} disabled={false} helperText=''/>
                <MySelect data={uniqueArr(choiceCity)} clName={"location"} name={t`City`}  setAble={()=>{}} disabled={!ableCity} helperText={!ableCity? "Please choose country": ""}/>
                <SelectMultiple data={arrVendorName? arrVendorName: []} clName={"location"}  name={t`Vendor`} disabled={false} helperText={""}/>
                <MySelect data={categoryArr? categoryArr : []} clName={"location"} name={t`Category`} setAble={setAbleSubCategory} disabled={false} helperText=''/>
                <SelectMultiple data={arr} clName={"location"} name={t`Sub Category`} disabled={!ableSubCategory} helperText={!ableSubCategory? "Please choose category": ""}/>
            {pathname === STATISTIC_ROUTE &&  <SelectMultiple data={arr} clName={"location"} name={t`User`} disabled={false} helperText={""}/>}

            </>}
            {pathname !== MAIN_ROUTE  &&  <ContainerDataPiker />}
            <Submitbutton name={t`Apply`} handleClick={(e:any)=>{}} classN={"submit"}/>
        </div>
        </div>

    );
};

export default SearchBar;