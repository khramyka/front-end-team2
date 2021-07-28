import React, {useEffect} from 'react';

import ChipsArray from "../../common/ChipsArray/ChipsArray";

import {  StatisticInformation,  ModalSearchBar} from "../../index";
import "./StatisticPage.scss";
import { resetUserState } from "../../../store/userSlise";
import {resetFilteState} from "../../../store/filtersStore";
import { resetChipState } from "../../../store/chipReducer";
import {resetHistory} from "../../../store/historySearch";
import {useAppDispatch, useAppSelector} from "../../../store/Redux-toolkit-hook";


const StatisticPage = () => {
  const dispatch = useAppDispatch();
      useEffect(()=>{
          const token = localStorage.getItem("token");
          if(!token){
              dispatch(resetUserState());
              dispatch(resetFilteState());
              dispatch(resetChipState());
              dispatch(resetHistory());
          }
          
      },[]);
     

    return (
        <div className={"statistic"}>
            
           <StatisticInformation/>
           
        </div>
    );
};

export default StatisticPage;  