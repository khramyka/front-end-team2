
import "./AdditionalDate.scss";
import * as React from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import {ExportInFile} from "../../../common/ExportInFile/ExportInFile";
import {makeStyles} from "@material-ui/core/styles";
import {authHost} from "../../../../http";
import {useState} from "react";

import { resetUserState } from "../../../../store/userSlise";
import {resetFilteState} from "../../../../store/filtersStore";
import { resetChipState } from "../../../../store/chipReducer";
import {resetHistory} from "../../../../store/historySearch";
import {useAppDispatch, useAppSelector} from "../../../../store/Redux-toolkit-hook";
import {getStatistic} from "../../../../http/discountApi";
import {setStatistic} from "../../../../store/statistic"
import {useEffect} from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.main
    },

}));

const columns: GridColDef[] = [
    { field: 'vendorName', headerName: 'Vendor', width: 240 },
    { field: 'name', headerName: 'Promo', width: 240 },
    { field: 'categoryName', headerName: 'Category', width: 240 },
    { field: 'usageDate', headerName: 'Date of Use', width: 240 },
    { field: 'userEmail', headerName: 'User', width: 240 },


];

let rows2:any = [];

const rows = [
    { id: 1, vendorName: 'Faberlic', promoName: 'Chanel #5', category: 'Beauty', date: '12.07.2021', location: 'Kyiv', department: 'HR', userName: 'Jon', link: 'www.faberlic.com' },
    { id: 2, vendorName: 'Addidas', promoName: 'Boll of Hell', category: 'Sport', date: '18.06.2021', location: 'Minsk', department: 'FrontEnd', userName: 'Bill', link: 'www.addidas.com' },
    { id: 3, vendorName: 'Roshen', promoName: 'Cockies for 50', category: 'Food', date: '29.07.2021', location: 'Lviv', department: 'BackEnd', userName: 'Smith', link: 'www.roshen.com' },
    { id: 4, vendorName: 'BMW', promoName: 'Pedals', category: 'Cars', date: '11.07.2021', location: 'Rome', department: 'PM', userName: 'Gretta', link: 'www.bmw.com' },
    { id: 5, vendorName: 'Danone', promoName: 'No way eat our yogurts', category: 'Food', date: '02.07.2021', location: 'Konotop', department: 'QI', userName: 'Paul', link: 'www.dannone.com' },
    { id: 6, vendorName: 'Winchester', promoName: 'Fast bullets ', category: 'Guns', date: '01.07.2021', location: 'London', department: 'FrontEnd', userName: 'Petya', link: 'www.guns.com' },
    { id: 7, vendorName: 'Faberlic', promoName: 'Chanel #5', category: 'Beauty', date: '12.07.2021', location: 'Kyiv', department: 'HR', userName: 'Jon', link: 'www.faberlic.com' },
    { id: 8, vendorName: 'Addidas', promoName: 'Boll of Hell', category: 'Sport', date: '18.06.2021', location: 'Minsk', department: 'FrontEnd', userName: 'Bill', link: 'www.addidas.com' },
    { id: 9, vendorName: 'Roshen', promoName: 'Cockies for 50', category: 'Food', date: '29.07.2021', location: 'Lviv', department: 'BackEnd', userName: 'Smith', link: 'www.roshen.com' },
    { id: 10, vendorName: 'BMW', promoName: 'Pedals', category: 'Cars', date: '11.07.2021', location: 'Rome', department: 'PM', userName: 'Gretta', link: 'www.bmw.com' },
    { id: 11, vendorName: 'Danone', promoName: 'No way eat our yogurts', category: 'Food', date: '02.07.2021', location: 'Konotop', department: 'QI', userName: 'Paul', link: 'www.dannone.com' },
    { id: 12, vendorName: 'Winchester', promoName: 'Fast bullets ', category: 'Guns', date: '01.07.2021', location: 'London', department: 'FrontEnd', userName: 'Petya', link: 'www.guns.com' },

];


const AdditionalDate = () => {
    const classes = useStyles();
    const [statObj, setStatObj] = useState([]);


    useEffect(()=>{
        getStatistic().then(resolve=>{
            console.log('resolve.data.content =', resolve.data.content);
            setStatObj(resolve.data.content);
            /*console.log('rows2 = ', rows2)*/
            rows2 = resolve.data.content
        })
    },[]);








    return (
        <div>
            <ExportInFile csvData={statObj} fileName={'statistic'}/>
            <div className={classes.root} style={{ height: 420, width: '100%', boxShadow: '1px 1px 1px 1px #c5d0d6' }}>
                <DataGrid rows={statObj} columns={columns} pageSize={10} rowHeight={30} />
            </div>
        </div>
    );
};


export default AdditionalDate;


