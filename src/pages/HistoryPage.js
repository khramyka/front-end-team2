import React from 'react';
import { CardList, Footer, Header, SearchBar } from '../components';

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