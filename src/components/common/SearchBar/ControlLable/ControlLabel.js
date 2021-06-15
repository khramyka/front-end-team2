import React, { useState } from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import "./ControloLable.scss"



const ControlLabel = ({ lable }) => {
    const [state, setState] = useState({
        checked: true,
    });

    const handleChange = (event) => {
        setState({ checked: event.target.checked });
    };
    return (
        <FormControlLabel
            control={
                <Checkbox
                    style={{ color: "#0082CA" }}
                    className="color-check"
                    checked={state.checked}
                    onChange={handleChange}
                    name="checked"
                    color="primary"
                />
            }
            label={lable}
        />
    );
};

export default ControlLabel;