import React, {useState} from 'react';
import {Button, Backdrop, CircularProgress, makeStyles} from "@material-ui/core"
import "./Submitbutton.scss";
import Spinner from '../spinner/Spinner';

const useStyles = makeStyles((theme) => ({
    root: {
        color: "#ffffff",

    },
}))

const Submitbutton = ({name,  handleClick, classN, open, setOpen}:{name:string, handleClick:any, classN:string, open:boolean, setOpen:any}) => {
    const classes = useStyles()
     
    return (
        <>
            <Button variant="contained" onClick={handleClick} className={`${classes.root} ${classN}`}>
                {name}
            </Button>
            <Spinner handleClose={()=> setOpen(false)} open={open}/>
      </>
    );
};

export default Submitbutton;