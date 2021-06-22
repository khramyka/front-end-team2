import React from 'react';
import {
    AdminPanelCard,
    AdminPanelVendor,
    DelateVendorMenu,
    Footer,
    Header,

} from "../../index";
import Layout from "../../common/Layout/Layout";
import { useAuth0 } from '@auth0/auth0-react';
import "./MainPage.scss";
import Sort from "../../common/Sort/Sort";
import AdminBtn from "../../admin/AdminBtn/AdminBtn";


const MainPage = () => {
    const {user, isAuthenticated } = useAuth0();
    console.log(user)
    const admin = false;
    return (
        <div className={"homepage"}>
            <Header />
            {isAuthenticated && (
            <div>
                <img src={user?.picture} alt={user?.name} />
                <h2>{user?.name}</h2>
                <p>{user?.email}</p>
            </div>
        )}
           {/* <SearchBar />*/}
             {admin && (
                <div>
                    <AdminPanelCard />
                    <AdminPanelVendor />
                    <DelateVendorMenu/>
                </div>
            )}

            <Layout />

            <Footer /> 
        </div>
    );
};

export default MainPage;