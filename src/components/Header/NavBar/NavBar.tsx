import React from 'react';
import "./../Header.scss";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {NavLink} from "react-router-dom";
import {Hidden, makeStyles} from "@material-ui/core";
import Gravatar from "react-gravatar";

const useStyles = makeStyles((theme) => ({
    link: {
        backgroundColor: "#F7F9FB",
        color: "#1877F2",
        width: "100%",
        justifyContent: "flex-end",
        borderBottom: "1px solid #9e9e9e",

    },
    logout: {
        color: "#E44949",
        justifyContent: "flex-end",
        backgroundColor: "#F7F9FB",
    },

    menu: {
        marginTop: "67px",
        display: "flex",
        marginLeft: "7px",
        width: "calc(100% + 29px)",
        [theme.breakpoints.down('xs')]: {
            marginTop: "55px",
            marginLeft: "14px",
        }
    },
}));


export default function NavBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    let admin = true;


    return <>
        <div className={"desktop-nav"}>
            <NavLink to={"/main-page"} activeClassName={"activelink"}>Home</NavLink>
            <NavLink to={"/history"} activeClassName={"activelink"}>History</NavLink>
            {admin &&
            <NavLink to={"/statistic"} activeClassName={"activelink"}>Statistics</NavLink>
            }

        </div>
        <div className={"gravatar"}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>

                <Gravatar email="ov4lil@icloud.com" size={100}/>
            </Button>

            <Menu
                style={{left: "0"}}
                className={classes.menu}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                    disablePadding: true,
                }}

            >

                <MenuItem onClick={handleClose} className={classes.link}><p className={"link"}>Username</p></MenuItem>
                <Hidden mdUp>
                    <MenuItem onClick={handleClose} className={classes.link}><NavLink to={"/main-page"}
                                                                                      className={"link"}>Home</NavLink></MenuItem>
                    <MenuItem onClick={handleClose} className={classes.link}><NavLink to={"/history"}
                                                                                      className={"link"}>History</NavLink></MenuItem>
                </Hidden>
                {admin &&
                <Hidden smUp>
                    <MenuItem onClick={handleClose} className={classes.link}><p className={"link"}>vendors</p>
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={classes.link}><p className={"link"}>add a promotion</p>
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={classes.link}><p className={"link"}>add a vendor</p>
                    </MenuItem>
                </Hidden>
                }
                <MenuItem onClick={handleClose} className={classes.logout}><NavLink to={"/login"}
                                                                                    className={"link logout"}>Logout</NavLink></MenuItem>

            </Menu>
        </div>
    </>
}