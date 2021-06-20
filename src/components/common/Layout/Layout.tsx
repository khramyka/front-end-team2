import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Layout.scss";
import Header from "../../../components/Header/Header";
import Footer from "../../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";
import ExtendedCard from "../../card/ExtendedCard/ExtendedCard";
import Grid from "@material-ui/core/Grid";
import SaleCard from "../../card/SaleCard/SaleCard";
import FilterListIcon from "@material-ui/icons/FilterList";



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1200,
        margin: "0 auto",
        flexGrow: 1,
    },

    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
}));

export default function FullWidthGrid() {
    const classes = useStyles();

    const handleClick = (e: any) => {
        console.log(e.target.className);
        const cName: any = e.target.className;
        const tName: any = e.target.tagName;
        console.log(tName);

        if ((cName === '') || (cName === 'card-more') || (cName === 'card-drop') || (tName === 'circle') || (tName === 'path')) {
            return null} else {
            const myElement: HTMLElement | null =
                document.querySelector(".ExtendedCard");
            if (myElement === null) {
                console.log("no element");
            } else {
                myElement.style.display = "block";
                document.getElementById("excard")!.scrollIntoView({behavior: 'smooth'});
            }
        }

    };

    const filterClick = () => {
        const myElement: HTMLElement | null = document.querySelector(".filterBar");
        if (myElement === null) {
            console.log("no element");
        } else {
            myElement.classList.toggle("open");
        }
    };

    return (
        <div className={classes.root}>
            {/*Header component*/}
            {/* <Header/>*/}
            {/*Header component*/}

            {/*main content in page*/}
            <div className="mainContent" style={{ position: "relative" }}>
                <div className="filterButton" onClick={filterClick}>
                    <FilterListIcon fontSize="large" />
                </div>

                <div className="filterBar">
                    <SearchBar />
                </div>

                <div className="cards">
                    <ExtendedCard />
                    <Grid container spacing={3} justify="center">
                        {[0, 1, 2, 3, 4, 5].map((value) => (
                            <Grid key={value} item onClick={handleClick}>
                                <SaleCard/>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid xs={12} justify="center">
                        {/*block for pagination*/}
                        1 2 3 4 5 6 7 8
                    </Grid>
                </div>
            </div>
            {/*main content in page*/}

            {/*Footer component*/}
          {/*  <Footer />*/}
            {/*Footer component*/}
        </div>
    );
}
