import React, {Fragment, MouseEvent, useState, useEffect} from 'react';
import { SaleCard, ModalSearchBar } from '../../index';
import "./CardList.scss";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import ExtendedCard from "../../card/ExtendedCard2/ExtendedCard";
import AdminBtn from '../../admin/AdminBtn/AdminBtn';
import Sort from "../../common/Sort/Sort";
import ChipsArray from "../../common/ChipsArray/ChipsArray";
import { useAppSelector, useAppDispatch } from "../../../store/Redux-toolkit-hook";
import purple from '@material-ui/core/colors/purple';
import {MAIN_ROUTE, HISTORY_ROUTE} from "../../../utils/consts"
import {useLocation} from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';
import {Spinner} from "../../index";
import {addDiscounds, setSearchObjectPage} from "../../../store/filtersStore";
import {getDiscounts} from "../../../http/discountApi";
import AlertZeroPromo from "../../common/AlertZeroPromo/AlertZeroPromo"


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
    const dispatch = useAppDispatch();
    const {searchObject, discounds, numberOfElements} = useAppSelector(state=>state.filters);
    const {pathname} = useLocation();
    const NUMBER_CARD = 15

    const[data, setData] =useState(discounds)
    useEffect(()=>{
        setData(discounds)
    },[discounds])
    
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const loadingDiscount = async()=>{
            const {data} = await getDiscounts(searchObject);
            dispatch(addDiscounds(data.content));
        };

    useEffect(()=>{
        loadingDiscount()
        setPage(searchObject.page+1)
    },[searchObject?.page])

    const handleChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setSearchObjectPage(value-1));
    };
    const [card, setCard] = React.useState(0);

    
    const handleClick = (e: any, index: number) => {
        const cName: any = e.target.className;
        const tName: any = e.target.tagName;

        if ((cName === '')  || (tName === 'circle') || (tName === 'path')) {
            return null
        } else {

            const myElement: HTMLElement | null =
                document.querySelector(".ExtendedCard");

            const mainContent: HTMLElement | null =
                document.querySelector(".main-content");

            if (myElement === null) {
                return null;
            } else {
                myElement.style.zIndex = "1100";
                myElement.style.opacity= "1";
                myElement.style.position= "absolute";


                setTimeout(()=> {
                    const myElement: HTMLElement | null =

                        document.querySelector(".ExtendedCard");

                    const mainContent: HTMLElement | null =
                        document.querySelector(".main-content");
                    if (mainContent === null) {
                        return null;
                    } else {
                        mainContent.style.marginTop = '';
                        mainContent.style.marginTop = (mainContent.style.marginTop + myElement.clientHeight + 'px');

                    }

                }, 800);


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

               {data.length ? <ExtendedCard discount={data[card]} /> : null}

               <div className="main-content">
                    <div className={"sort-admin"}>
                        {pathname===MAIN_ROUTE?<Sort /> : <ModalSearchBar/>}
                        {isAdmin &&
                        <AdminBtn />}
                    </div>
                    <div className={"chips"}>
                        {!(pathname === HISTORY_ROUTE)&& <ChipsArray />}
                    </div>
                    {data.length ? null : <AlertZeroPromo/>}
                     <Grid container spacing={3} justify="center" >
                        {
                            data.map((item, index) => {
                                return (<Grid key={index} item >
                                    <SaleCard discount={item}
                                              cards={data}
                                            //   updateData={(item: any) => setData(item)}
                                              handleClick={(event: any) => handleClick(event, index)} />
                                </Grid>)
                            })
                        }
                    </Grid>
                    <div className="main-content__paginator">

                            <div className={classes.root}>
                                <Pagination count={Math.ceil(numberOfElements / NUMBER_CARD)} variant="outlined"
                                            page={page} onChange={handleChange} />
                            </div>

                    </div>
                </div>
                
                
            </div>
    );
};

export default CardList;
