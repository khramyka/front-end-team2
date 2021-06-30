import React from 'react';
import "./../Header.scss";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {NavLink} from "react-router-dom";
import {Hidden, makeStyles} from "@material-ui/core";
import Gravatar from "react-gravatar";
import DelateVendorMenu from '../../admin/DelateVendorMenu/DelateVendorMenu';
import AdminPanelCard from '../../admin/AdminPanelCard/AdminPanelCard';
import AdminPanelVendor from '../../admin/AdminPanelVendor/AdminPanelVendor';
import {useAppSelector} from "../../../store/Redux-toolkit-hook";
import {LogoutButton} from "../../index";

const useStyles = makeStyles((theme) => ({
    link: {
        backgroundColor: "#F7F9FB",
        color: "#1877F2",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        borderBottom: "1px solid #9e9e9e",

    },
    logout: {
        color: "#E44949",
        justifyContent: "flex-end",
        backgroundColor: "#F7F9FB",
    },

    menu: {
        marginTop: "70px",
        display: "flex",
        width: "calc(100% + 30px)",
        marginLeft: "75px",
        [theme.breakpoints.down('xs')]: {
            marginTop: "55px",
            marginLeft: "-15px",
        }
    },
}));


const NavBar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const userName = useAppSelector(state => state.user.userName);
    const userEmail = useAppSelector(state => state.user.email);
    const admin: boolean = useAppSelector(state => state.user.admine)

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

                <Gravatar email={userEmail} size={100}/>
            </Button>

            <Menu
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
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

                <MenuItem onClick={handleClose} className={classes.link}><p className={"link"}>{userName}</p></MenuItem>
                <Hidden mdUp>
                    <MenuItem onClick={handleClose} className={classes.link}><NavLink to={"/main-page"}
                                                                                      className={"link"}>Home</NavLink></MenuItem>
                    <MenuItem onClick={handleClose} className={classes.link}><NavLink to={"/history"}
                                                                                      className={"link"}>History</NavLink></MenuItem>
                    <MenuItem onClick={handleClose} className={classes.link}><NavLink to={"/statistic"}
                                                                                      className={"link"}>Statistic</NavLink></MenuItem>
                </Hidden>
                {admin &&
                <Hidden smUp>
                    <MenuItem onClick={handleClose} className={classes.link}><p className={"link"}><DelateVendorMenu /></p>
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={classes.link}><p className={"link"}><AdminPanelCard /></p>
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={classes.link}><p className={"link"}><AdminPanelVendor /></p>
                    </MenuItem>
                </Hidden>
                }
                <MenuItem onClick={handleClose} className={classes.logout}>
                    <NavLink to={"/login"} className={"link logout"}><LogoutButton/></NavLink>
                </MenuItem>
            </Menu>
        </div>
    </>
}
export default NavBar;