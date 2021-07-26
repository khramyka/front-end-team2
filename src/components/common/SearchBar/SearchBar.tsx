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
import Button from '@material-ui/core/Button';
import {firsLetterToUpperCase} from "../../../helpers/functionHelpers";
import {useLocation} from "react-router-dom";
import {STATISTIC_ROUTE, HISTORY_ROUTE, MAIN_ROUTE} from "../../../utils/consts";
import {useAppSelector, useAppDispatch} from "../../../store/Redux-toolkit-hook";
import { makeStyles } from "@material-ui/core/styles";
import { t } from 'ttag';
import {getSubCategoryAll} from "../../../http/filtersApi";
import {getDiscounts, getDiscountsHistory} from "../../../http/discountApi";
import {timeString} from "../../../helpers/functionHelpers"
import {setSearchObject, addDiscounds,setNumberOfElements, addSubCategory, setFavourite, setEndDataHistory, setStartDataHistory, setDiscountsHistory} from "../../../store/filtersStore"
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 8
    },

}));


const SearchBar =()=>{
    const getArrName =(name) =>{
        return name?.filter((item: any)=> item.deleted === false).map(item=> firsLetterToUpperCase(item.name));
    }
    const dispatch = useAppDispatch();
    const arrChips = useAppSelector(state => state.chips);
    const {category, vendorLocation, vendor,  searchObject , subCategory, discounds, searchObjectHistory} = useAppSelector(state=>state.filters);
    const arrSubCatygory = getArrName(subCategory)
    const arrCountry = vendorLocation?.map(item=>firsLetterToUpperCase(item.country))
    const uniqueArr = (arr:string[]) => Array.from(new Set(arr));
    const categoryArr = getArrName(category)
    const arrVendorName =vendor?.map(item=>firsLetterToUpperCase(item.name));
    const [categoryId, setCategoryId] = useState("")

    
    

    const getIds = (name: string, array: any): string[]=>{
        const arr = arrChips.ChipsArray.filter(item => item.name=== name).map(item=> Object.keys(item)[0])
        const arrid:string[] = [];
        arr.forEach(item => {
            array.forEach(i => {
                i.name.toLowerCase() === item.toLowerCase() && arrid.push(i.id);
            })
        })
        return arrid;
    }

    useEffect(()=>{
        categoryId && getSubCategoryAll(categoryId).then(resolve=>dispatch(addSubCategory(resolve.data)));
    },[categoryId])

    const getSubCatygoryId = () =>{
        const arr = arrChips.ChipsArray.filter(item => item.name=== "Category").map(item=> Object.values(item)[0]).flat();
        const arrid:string[] = [];
        arr.forEach(item => {
            subCategory.forEach(i => {
                i.name.toLowerCase() === item.toLowerCase() && arrid.push(i.id);
            })
        })
        return arrid;
    }

    useEffect(()=>{
        const categoryId =  getIds("Category", category)[0];
        setCategoryId(categoryId)
        const obj = {
            page: 0,
            size: 15,
            city: arrChips.ChipsArray.filter(item => item.name=== "Country").map(item=> Object.values(item)[0])[0],
            country: arrChips.ChipsArray.filter(item => item.name=== "Country").map(item=> Object.keys(item)[0]),
            vendorIds: getIds("Vendor", vendor),
            categoryId:  categoryId,
            subCategoryIds: getSubCatygoryId(),
        }
        dispatch(setSearchObject(obj))
    },[arrChips])

    useEffect(() => {
        handleClick(searchObject)
    }, [searchObject]);

    const handleClick = async(obj:any) =>  {
        
        const {data} = await getDiscounts(obj);
        dispatch(addDiscounds(data))
     };
    const [ableSubCategory, setAbleSubCategory] = useState<String>("");
    const [ableCity, setAbleCyti] = useState<String>("");
    const [choiceCity, setChoiceCity] = useState<string[]>([])
    useEffect(()=>{
       setChoiceCity(vendorLocation?.filter(item=>item.country === ableCity).map(item=>firsLetterToUpperCase(item.city)));
    },[ableCity])
    const {pathname} = useLocation();
    const classes = useStyles()
    const favourite = searchObject.favourite
    const [stateControlLable, setStateControlLble] = useState<Boolean>(favourite);
    
    const setfavourite = (e) => {
         setStateControlLble(e);
         dispatch(setFavourite())
    }
    
    const className = pathname === STATISTIC_ROUTE || pathname === HISTORY_ROUTE ? "container-searchbar modal-searchBar": "container-searchbar";
    const [time, setTime] = useState({To: new Date(), From: new Date()});

    useEffect(() => {
        console.log("a")
        dispatch(setEndDataHistory(timeString(time.To)))
        dispatch(setStartDataHistory(timeString(time.From)))
    }, [time])

    const apply = () => {
        getDiscountsHistory(searchObjectHistory).then(resolve=> dispatch(setDiscountsHistory(resolve.data.content))).catch(f=> console.log(f));
    }

    return (
        <div className={classes.root}>
        <div className={className} >
            {pathname === MAIN_ROUTE && 
            <>
                <SearchForm handleClick={handleClick}/>
                <div className="containerFavorite">
                    <ControlLabel lable={t`Favorite`} setStateControlLable={setfavourite} stateControlLable={stateControlLable} />
                </div>
            </>
            }
            {pathname !== HISTORY_ROUTE && <>
                <MySelect data={arrCountry? uniqueArr(arrCountry):[]} isCategory={false} clName={"location"} id={'1'} name={`Country`} localName={t`Country`} setAble={setAbleCyti} disabled={false} />
                <MySelect data={uniqueArr(choiceCity)} clName={"location"}  isCategory={true} name={`City`} localName={t`City`} id={'1'}  disabled={!ableCity} helperText={!ableCity? t`Please choose country`: ""}/>
                <SelectMultiple data={arrVendorName? arrVendorName: []} isCategory={false} clName={"location"}  name={`Vendor`} localName={t`Vendor`} disabled={false} />
                <MySelect data={categoryArr? categoryArr : []} id={'2'} isCategory={false} clName={"location"} name={`Category`} localName={t`Category`} setAble={setAbleSubCategory} disabled={false} />
                <SelectMultiple data={arrSubCatygory? arrSubCatygory: []} clName={"location"} id={'2'} name={`Sub Category`} localName={t`Sub Category`} isCategory={true} disabled={!ableSubCategory} helperText={!ableSubCategory? t`Please choose category`: ""}/>
            {pathname === STATISTIC_ROUTE &&  <SelectMultiple data={[]} clName={"location"} name={`User`} localName={t`User`} isCategory={false} disabled={false} />}


            </>}
            {!(pathname === MAIN_ROUTE)  &&  <>
            <ContainerDataPiker setTime={setTime}/>
            <Submitbutton  classN={"submit"} handleClick={apply} name={"Apply"}/>
            </>
            }
        </div>
        </div>

    );
};
export default SearchBar;