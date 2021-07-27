import React, {useEffect} from 'react';
import { CardList} from "../../index";
import "./HistoryPage.scss";
import {useAppDispatch, useAppSelector} from "../../../store/Redux-toolkit-hook";
import { setDiscountsHistory} from "../../../store/filtersStore";
import {getDiscountsHistory} from "../../../http/discountApi"

const HistoryPage = () => {
     const dispatch = useAppDispatch();
    const historyObj = useAppSelector(state => state.historyObj)
    useEffect(()=>{
        historyObj && getDiscountsHistory(historyObj).then(resolve=> dispatch(setDiscountsHistory(resolve.data))).catch(f=> console.log(f)); 
    },[historyObj]);
    return (
        <div className="history"> 
           
           <CardList/>
        </div>
    );
};

export default HistoryPage;