import React, { useState } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const materialTheme = (createMuiTheme as any)({
    overrides: {
        MuiPickersDay: {
            day: {
                color: "#014f79",
                "&:hover": {
                    color: "#0082CA",
                },
            },
            daySelected: {
                backgroundColor: "#0082CA",
                "&:hover": {
                    backgroundColor: "#014f79",
                    color: "white"
                },
            },
            dayDisabled: {
                color: "#0082CA",
            },
            current: {
                color: "#0082CA",
            },
        },
    },
});

const DatePiker = (props: {label: string}) => {
     const [selectedDate, setSelectedDate] = useState(
         new Date()
     );

     const handleDateChange = (date: any) => {
         setSelectedDate(date);
     };
    return (
        <ThemeProvider theme={materialTheme}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label={props.label}
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    "aria-label": "change date",
                }}
            />
        </ThemeProvider>
    );
};

export default DatePiker;

