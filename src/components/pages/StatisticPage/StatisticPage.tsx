import React, {useEffect} from 'react';

import {Filter, } from "../../index";
import ChipsArray from "../../common/ChipsArray/ChipsArray";

import {  StatisticInformation,  ModalSearchBar} from "../../index";
import "./StatisticPage.scss";
import { resolve } from 'path/posix';
import {authHost} from "../../../http";
import {getSubCategoryAll} from "../../../http/filtersApi";
import {addSubCategory} from "../../../store/filtersStore";







const StatisticPage = () => {
    return (
        <div className={"statistic"}>
            <ModalSearchBar/>
            <ChipsArray/>
           <StatisticInformation/>
           
        </div>
    );
};

export default StatisticPage;