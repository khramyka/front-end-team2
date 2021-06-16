import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {Box, createMuiTheme, Hidden, IconButton, makeStyles} from "@material-ui/core";
import React from "react";
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import "./AdminBtn.scss"


const useStyles = makeStyles((theme) => ({
    btn: {
        color: "#1877F2"
    },
    item: {
        border: "#1877F2 solid 1px",
        borderRadius: "30px",
        marginTop: "10px",
        justifyContent: "center",
        color: "#1877F2",
        backgroundColor: '#fff'
    },
    menu: {
        boxShadow: "none",
        marginTop: "35px",
        background: "transparent",
        display: "flex",

    }
}));



export default function AdminBtn(){
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const classes = useStyles();
    return(
        <Hidden xsDown >
        <div className={"adminBtn"}>

            <IconButton
                aria-label="more"
                aria-controls="admin-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.btn}

            >
                <AddCircleOutlineIcon fontSize="large"/>
            </IconButton>
            <div className={"admin-menu"}>
            <Menu
                elevation={0}
            className={classes.menu}
            id="admin-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
                disablePadding: true,
                }}
            >

                <MenuItem className={classes.item}>vendors</MenuItem>
                <MenuItem className={classes.item}>add a promotion</MenuItem>
                <MenuItem className={classes.item}>add a vendor</MenuItem>

            </Menu>

            </div>

        </div>
        </Hidden>
    )
}