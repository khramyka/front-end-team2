import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {Button, createMuiTheme} from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns";
import "./ContainerDatePiker.scss"
import DatePiker from './DatePiker/DatePiker';
import {useLocation} from "react-router-dom";
import {STATISTIC_ROUTE} from "../../../../utils/consts"
import { t } from 'ttag';
import {MAIN_ROUTE} from "../../../../utils/consts";
import React, {useState, useEffect} from "react";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#014f79",
    }
  },
});


const ContainerDataPiker = ({setTime, time}:{setTime:any, time:any}) => {
    const {pathname} = useLocation();
    const [selectedDate, setSelectedDate] = useState(time? time : {
        From: new Date(),
        To : new Date(),
    });
    const [helperText, setHelperText] = useState("");
    useEffect(() => {
        selectedDate.From - selectedDate.To > 0 ? setHelperText("start date must be earlier then end date") : setHelperText("")
    }, [selectedDate])
    const handleClick = () =>{
        setSelectedDate({From: new Date(),To : new Date(),})
        
        setTime(selectedDate)
    }
    const setDate = (name:string, date:any) => {
        setSelectedDate({...selectedDate, [name]: date });
        setTime({...selectedDate, [name]: date })
    }
    return (
        <div className={pathname !== MAIN_ROUTE? "containerData-searchBar":"containerData"}>
            <span className="containerData__span">{t`Date`}</span>
            <div className="containerData__picker">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePiker label={t`From`}  setDate={setDate} selectedDate={selectedDate.From} />
                                <DatePiker label={t`To`} setDate={setDate} selectedDate={selectedDate.To} helperText={helperText}/>
                </MuiPickersUtilsProvider>
                {pathname !== MAIN_ROUTE && <ThemeProvider theme={theme}>
                    <Button  color="primary" onClick={handleClick} >{t`Clean date`}</Button>
                </ThemeProvider>}
            </div>
        </div>
    );
};

export default ContainerDataPiker;
