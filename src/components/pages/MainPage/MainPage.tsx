import React from 'react';
import { getUserDetails, check } from "../../../http/userApi";
import Layout from "../../common/Layout/Layout";
import "./MainPage.scss";
import { useAppSelector} from "../../../store/Redux-toolkit-hook";


const MainPage = () => {


    const userId = useAppSelector(state => state.user.userId);
    const userDatails = getUserDetails(userId);
    const a = check();
    console.log(a)
    console.log(userDatails)

    
    return (
        <div className={"homepage"}>


             {/*{isAdmin && (
                <div>
                    <AdminPanelCard />
                    <AdminPanelVendor />
                    <DelateVendorMenu/>
                </div>
            )}*/}

            <Layout />


        </div>
    );
};

export default MainPage;