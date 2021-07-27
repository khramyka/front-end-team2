import React, {useEffect} from 'react';
import Layout from "../../common/Layout/Layout";
import "./MainPage.scss";
import {useAppDispatch, useAppSelector} from "../../../store/Redux-toolkit-hook";
import {addCategory, addVendor, addVendorLocation, setDiscountsHistory} from "../../../store/filtersStore";
import {getCategoryAll,getVendorAll,getAllVendorLocation,} from "../../../http/filtersApi"
import {getDiscountsHistory} from "../../../http/discountApi"
const MainPage = () => {
    const dispatch = useAppDispatch();
    const { searchObject} = useAppSelector(state => state.filters)
    const historyObj = useAppSelector(state => state.historyObj);
    useEffect(()=>{
         console.log(historyObj)
         console.log(searchObject)
         getDiscountsHistory(historyObj).then(resolve=> dispatch(setDiscountsHistory(resolve.data))).catch(f=> console.log(f));
        getCategoryAll().then(resolve=>dispatch(addCategory(resolve.data))).catch(f=> console.log(f));
        getAllVendorLocation().then(resolve =>dispatch(addVendorLocation(resolve.data)) ).catch(f=> console.log(f));
        getVendorAll().then(resolve=> dispatch(addVendor(resolve)));

    },[]);
 return (
        <div className={"homepage"}>

            <Layout />
        </div>
    );
};

export default MainPage;