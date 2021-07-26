import React, {useEffect} from 'react';
import Layout from "../../common/Layout/Layout";
import "./MainPage.scss";
import {useAppDispatch} from "../../../store/Redux-toolkit-hook";
import {addCategory, addVendor, addVendorLocation, initialFiltersState, } from "../../../store/filtersStore";
import {getCategoryAll,getVendorAll,getAllVendorLocation,} from "../../../http/filtersApi"
import {getDiscounts} from "../../../http/discountApi";
const MainPage = () => {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        getCategoryAll().then(resolve=>dispatch(addCategory(resolve.data))).catch(f=> console.log(f));
        getAllVendorLocation().then(resolve =>dispatch(addVendorLocation(resolve.data)) ).catch(f=> console.log(f));
        getVendorAll().then(resolve=> dispatch(addVendor(resolve)));
        getDiscounts({initialFiltersState}).then(resolve=> console.log(resolve));

    },[]);
 return (
        <div className={"homepage"}>

            <Layout />
        </div>
    );
};

export default MainPage;