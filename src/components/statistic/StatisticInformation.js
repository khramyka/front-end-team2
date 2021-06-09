import React from 'react';
import {AdditionalDate, GraphInfo, InformationBlock, StatisticFilter,} from "../index";

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