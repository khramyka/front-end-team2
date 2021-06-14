import React from 'react';
import {FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import "./Select.scss"



const MySelect = ({data, name, clName}) => {
    const [age, setAge] = React.useState("");
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <FormControl className={clName}>
            <InputLabel id="select">
                {name} {data.length}
            </InputLabel>
            <Select labelId="select" value={age} onChange={handleChange}>
                {data.map((item) => (
                    <MenuItem value={item} key={item}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MySelect;