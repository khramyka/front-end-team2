import React, {MouseEvent, useState} from 'react';
import { SaleCard} from '../../index';
import "./CardList.scss";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import ExtendedCard from "../../card/ExtendedCard2/ExtendedCard";
import AdminBtn from '../../admin/AdminBtn/AdminBtn';
import Sort from "../../common/Sort/Sort";
import ChipsArray from "../../common/ChipsArray/ChipsArray";
import {useAppSelector} from "../../../store/Redux-toolkit-hook";



const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                marginTop: theme.spacing(2),
                display: 'flex',
                justifyContent: 'center',
            },
        },
    }),
);




const CardList:React.FC = (props) => {

    const NUMBER_CARD = 8

    const [data,setData] = useState([
        {nameDiscount: 'Macdonald',sizeDiscount: "34%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'Adidas Original',sizeDiscount: "25%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'Nike',sizeDiscount: "50%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'Puma',sizeDiscount: "70%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'Mega Sport',sizeDiscount: "10%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'Sport Master',sizeDiscount: "60%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'StarWood',sizeDiscount: "50%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'Pizza',sizeDiscount: "40%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'Smart',sizeDiscount: "10%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'Eldorado',sizeDiscount: "20%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'Samsung',sizeDiscount: "45%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'Pizza',sizeDiscount: "40%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'Smart',sizeDiscount: "10%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'Eldorado',sizeDiscount: "20%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'Samsung',sizeDiscount: "45%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'Pizza',sizeDiscount: "40%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'Smart',sizeDiscount: "10%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'Eldorado',sizeDiscount: "20%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'Samsung',sizeDiscount: "45%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
        {nameDiscount: 'Pizza',sizeDiscount: "40%", date: '06 May 2021', place: 'Yakuba Kolasa St,37'},
    ])
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const [card, setCard] = React.useState(0);

    const paginateCard = () => {
        let from = (page - 1) * NUMBER_CARD
        let to = from + NUMBER_CARD
        return data.slice(from, to)
    }
    const handleClick = (e: any, index:number) => {
        console.log(e.target.className);
        const cName: any = e.target.className;
        const tName: any = e.target.tagName;
        console.log('tName', tName);

        if ((cName === '') || (cName === 'card-more') || (cName === 'card-drop') || (tName === 'circle') || (tName === 'path')) {
            return null} else {
            const myElement: HTMLElement | null =
                document.querySelector(".ExtendedCard");
            if (myElement === null) {
                console.log("no element");
            } else {
                myElement.style.display = "block";
                document.getElementById("excard")!.scrollIntoView({behavior: 'smooth'});
                if (page === 1) {
                    setCard(index)
                } else {
                    setCard(index + (page - 1)*NUMBER_CARD)
                }

                console.log('index', index)
                console.log('page', page);
            }
        }

    };
    const isAdmin = useAppSelector(state => state.user.admine);
    return (
        <div className="card-list">
            <ExtendedCard discount={data[card]}/>
            <div className={"chips"}>
                <ChipsArray/>
            </div>
            <div className={"sort-admin"}>
                <Sort />
                {isAdmin &&
                <AdminBtn />}
            </div>

            <Grid container spacing={3} justify="center">
                {
                    paginateCard().map((item, index) => {
                        return (<Grid key={index} item onClick={(event) => handleClick(event,index)}><SaleCard discount={item}/></Grid>)
                    })
                }
                {/*<div className='cardd' onClick={(e:MouseEvent)=>setCard(index)}><SaleCard key={index} discount={item}/></div>*/}
                {/*  {[0, 1, 2, 3, 4, 5].map((value) => (
                            <Grid key={value} item onClick={handleClick}>
                                <SaleCard


                                 />
                            </Grid>
                        ))}*/}
            </Grid>
            <Grid xs={12} justify="center">
                <div className={classes.root}>
                    <Pagination count={Math.ceil(data.length / NUMBER_CARD)} variant="outlined" color="primary"
                                page={page} onChange={handleChange}/>
                </div>
            </Grid>

            {/*<div className={classes.root}>*/}
            {/*    <Pagination count={Math.ceil(data.length/4)} variant="outlined" color="primary" page={page} onChange={handleChange} />*/}
            {/*</div>*/}
        </div>
    );
};

export default CardList;