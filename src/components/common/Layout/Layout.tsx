import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ResponsiveDrawer from "../ResponsiveDrawer/ResponsiveDrawer";
import Header from '../../../components/Header/Header';
import Footer from "../../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1200,
        margin: '0 auto',
        flexGrow: 1,

    },

    /* breakpoints: {
         values: {
             mobile: 800,
             tablet: 900,
             desktop: 1280,
         }},*/

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function FullWidthGrid() {
    const classes = useStyles();

    return (
        <div   className={classes.root}>
            <Header />

            <div id="drawer-container" style={{position: 'relative'}}>


                <ResponsiveDrawer    />



            </div>
            <Footer/>

        </div>
    );
}
