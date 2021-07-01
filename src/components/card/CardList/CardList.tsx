import React, { MouseEvent, useState } from 'react';
import { SaleCard } from '../../index';
import "./CardList.scss";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import ExtendedCard from "../../card/ExtendedCard2/ExtendedCard";
import AdminBtn from '../../admin/AdminBtn/AdminBtn';
import Sort from "../../common/Sort/Sort";
import ChipsArray from "../../common/ChipsArray/ChipsArray";
import { useAppSelector } from "../../../store/Redux-toolkit-hook";

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

const CardList: React.FC = (props) => {

    const NUMBER_CARD = 8

    const [data, setData] = useState([
        { id: 1, nameDiscount: 'Macdonald', sizeDiscount: "34%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 2, nameDiscount: 'Adidas Original', sizeDiscount: "25%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 3, nameDiscount: 'Nike', sizeDiscount: "50%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 4, nameDiscount: 'Puma', sizeDiscount: "70%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 5, nameDiscount: 'Mega Sport', sizeDiscount: "10%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 6, nameDiscount: 'Sport Master', sizeDiscount: "60%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 7, nameDiscount: 'StarWood', sizeDiscount: "50%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 8, nameDiscount: 'Pizza', sizeDiscount: "40%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 9, nameDiscount: 'Smart', sizeDiscount: "10%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 10, nameDiscount: 'Eldorado', sizeDiscount: "20%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 11, nameDiscount: 'Samsung', sizeDiscount: "45%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 12, nameDiscount: 'Pizza', sizeDiscount: "40%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 13, nameDiscount: 'Smart', sizeDiscount: "10%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 14, nameDiscount: 'Eldorado', sizeDiscount: "20%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 15, nameDiscount: 'Samsung', sizeDiscount: "45%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 16, nameDiscount: 'Pizza', sizeDiscount: "40%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 17, nameDiscount: 'Smart', sizeDiscount: "10%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 18, nameDiscount: 'Eldorado', sizeDiscount: "20%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 19, nameDiscount: 'Samsung', sizeDiscount: "45%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },
        { id: 20, nameDiscount: 'Pizza', sizeDiscount: "40%", date: '06 May 2021', place: 'Yakuba Kolasa St,37' },

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
    const handleClick = (e: any, index: number) => {
        const cName: any = e.target.className;
        const tName: any = e.target.tagName;

        if ((cName === '') || (cName === 'card-more') || (cName === 'card-drop') || (tName === 'circle') || (tName === 'path')) {
            return null
        } else {
            const myElement: HTMLElement | null =
                document.querySelector(".ExtendedCard");

            const mainContent: HTMLElement | null =
                document.querySelector(".main-content");


            if (myElement === null) {
                return null;
            } else {
                myElement.style.display = "block";
                 if (mainContent === null) {
                    return null;
                }  else {
                    mainContent.style.display = "none";
                }
                document.getElementById("excard")!.scrollIntoView({ behavior: 'smooth' });
                if (page === 1) {
                    setCard(index)
                } else {
                    setCard(index + (page - 1) * NUMBER_CARD)
                }
            }
        }
    };
    const isAdmin = useAppSelector(state => state.user.admine);

    return (
        <div className="card-list">
            <ExtendedCard discount={data[card]} />
            <div className="main-content">
                <div className={"sort-admin"}>
                    <Sort />
                    {isAdmin &&
                        <AdminBtn />}
                </div>
                <div className={"chips"}>
                    <ChipsArray />
                </div>
                <Grid container spacing={3} justify="center">
                    {
                        paginateCard().map((item, index) => {
                            return (<Grid key={index} item>
                                <SaleCard discount={item}
                                    cards={data}
                                    updateData={(item: any) => setData(item)}
                                    handleClick={(event: any) => handleClick(event, index)} />
                            </Grid>)
                        })
                    }
                    {/*<div className='cardd' onClick={(e:MouseEvent)=>setCard(index)}><SaleCard key={index} discount={item}/></div>*/}
                    {/*  {[0, 1, 2, 3, 4, 5].map((value) => (
                            <Grid key={value} item onClick={handleClick}>
                                <SaleCard/>
                            </Grid>
                        ))}*/}
                </Grid>
                <Grid xs={12} justify="center">
                    <div className={classes.root}>
                        <Pagination count={Math.ceil(data.length / NUMBER_CARD)} variant="outlined" color="primary"
                            page={page} onChange={handleChange} />
                    </div>
                </Grid>
            </div>
        </div>
        // {/*<div className={classes.root}>*/}
        // {/*    <Pagination count={Math.ceil(data.length/4)} variant="outlined" color="primary" page={page} onChange={handleChange} />*/}
        // {/*</div>*/}
    );
};

export default CardList;
