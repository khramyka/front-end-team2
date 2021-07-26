import React, {useEffect} from 'react';
import { CardList} from "../../index";
import "./HistoryPage.scss";
import {useAppDispatch, useAppSelector} from "../../../store/Redux-toolkit-hook";
import { setDiscountsHistory} from "../../../store/filtersStore";
import {getDiscountsHistory} from "../../../http/discountApi"

const HistoryPage = () => {
     const dispatch = useAppDispatch();
    const {searchObjectHistory} = useAppSelector(state => state.filters)
    useEffect(()=>{
        getDiscountsHistory(searchObjectHistory).then(resolve=> dispatch(setDiscountsHistory(resolve.data.content))).catch(f=> console.log(f)); 
    },[searchObjectHistory]);
    return (
        <div className="history">
           
           <CardList/>
        </div>
    );
};

export default HistoryPage;