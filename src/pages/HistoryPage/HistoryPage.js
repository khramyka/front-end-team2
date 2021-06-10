import React from 'react';
import { CardList, Footer, Header, SearchBar } from "../../components/index";
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