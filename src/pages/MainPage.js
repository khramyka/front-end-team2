import React from 'react';
import { AdminPanelCard, AdminPanelVendor, CardList, DelateVendorMenu, Footer, Header, SearchBar } from "../components";

const MainPage = () => {
    const admin = false;
    return (
        <div>
            <Header />
            <SearchBar />
            {admin && (
                <div>
                    <AdminPanelCard />
                    <AdminPanelVendor />
                    <DelateVendorMenu/>
                </div>
            )}

            <CardList />
            <Footer />
        </div>
    );
};

export default MainPage;