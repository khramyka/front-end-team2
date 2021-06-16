import React from 'react';
import {AdditionalDate, GraphInfo, InformationBlock, StatisticFilter,} from "../../../index";
import style from "./StatisticInformation.module.scss";

const StatisticInformation = () => {
    return (
        <div>
            <StatisticFilter/>
            <InformationBlock/>
            <GraphInfo/>
            <AdditionalDate/>
        </div>
    );
};

export default StatisticInformation;