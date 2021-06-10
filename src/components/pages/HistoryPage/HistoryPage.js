import React from 'react';
import { CardList, Footer, Header, SearchBar } from "../../index";
import style from "./HistoryPage.module.scss";

const HistoryPage = () => {
    return (
        <div>
            <Header/>
            <SearchBar/>
            <CardList/>
            <Footer/>
        </div>
    );
};

export default HistoryPage;