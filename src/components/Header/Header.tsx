import React from 'react';
import {Logo} from '../index';
import "./Header.scss";
import NavBar from "./NavBar/NavBar";
import AdminBtn from "../admin/AdminBtn/AdminBtn";


export default function Header() {
    return (
        <div className={"header"}>
            <div className={"header__container"}>
                <Logo/>
                <NavBar />
            </div>
        </div>
    );
};


