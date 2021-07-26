import React, { useState } from "react";
import { FormControlLabel, Checkbox,createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0082CA",
    }
  },
});

const ControlLabel = ({lable, setStateControlLable, stateControlLable }:{stateControlLable:boolean, lable:string, setStateControlLable:any }) => {
    const [state, setState] = useState(stateControlLable);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState( event.target.checked );
        setStateControlLable(event.target.checked)
    };
    return (
        <ThemeProvider theme={theme}>
            <FormControlLabel 
                control={
                    <Checkbox
                        style={{ color: "#0082CA" }}
                        className="color-check"
                        checked={state}
                        onChange={handleChange}
                        name="checked"
                        color="primary"
                    />
                }
                label={lable}
            />
        </ThemeProvider>
    );
};

export default ControlLabel;