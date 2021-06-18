import React, { useState } from "react";
import {
    Input,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Checkbox,
    ListItemText,
} from "@material-ui/core";

const SelectMultiple = (props: { clName: string, data: any, name: string, width: number}) => {
      const [personName, setPersonName] = useState<string[]>([]);

      const handleChange = (event: any) => {
          setPersonName(event.target.value);
      };

      const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: props.width
        },
    },
};

    return (
        <FormControl className={props.clName}>
            <InputLabel id="demo-mutiple-checkbox-label">
                {props.name}
            </InputLabel>
            <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<Input />}
                renderValue={(selected: any) => selected.join(", ")}
                MenuProps={MenuProps}
            >
                {props.data.map((name: string) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox
                            checked={personName.indexOf(name) > -1}
                            style={{ color: "#0082CA" }}
                        />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectMultiple;