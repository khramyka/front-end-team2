import React from 'react';
import { Footer, Header, StatisticInformation } from "../../index";
import style from "./StatisticPage.module.scss";

const StatisticPage = () => {
    return (
        <div>
           <Header/>
           <StatisticInformation/>
           <Footer/>
        </div>
    );
};

export default StatisticPage;