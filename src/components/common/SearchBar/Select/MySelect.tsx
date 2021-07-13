
import React,{useState} from 'react';
import {FormControl, Select, InputLabel, MenuItem, FormHelperText } from "@material-ui/core";
import "./Select.scss"
import {addChip, removeChip} from "../../../../store/chipReducer";
import {useAppDispatch,useAppSelector} from '../../../../store/Redux-toolkit-hook';


const MySelect = ({clName,data,name, setAble, disabled, helperText}:{helperText:string, disabled: boolean ,clName:string, data:string[], name:string, setAble:any}) => {
    
    const [age, setAge] = useState("");
    const dispatch = useAppDispatch()
    const chipData = useAppSelector(state => state.chips.ChipsArray)

    const handleChange = (event: React.ChangeEvent<{ value: any }>, index: any) => {
        const numberChip = event.target.value
        const indexChip = index.key.slice(2)
        const newChip = { id: name + indexChip, label: numberChip }
        dispatch(addChip(newChip))
        if (numberChip) {
            const indexRemove = data.indexOf(age)
            dispatch(removeChip(name + indexRemove))
        }
        setAge(event.target.value);
        setAble(event.target.value)
    };


    const filterChips = () => {
        for (const i in chipData) {
            if (chipData[i].id.slice(0, 4) === name.slice(0, 4)) {
                return chipData[i].label
            }
        }
        return ''
    }


    const [validation, setVal] = React.useState<string>();
    const [errors, setErrors] = React.useState<{ validation: string }>();

    return (
        <FormControl className={clName} >
            <InputLabel id="select">
                {name}
            </InputLabel>

            <Select labelId="select" value={filterChips()} onChange={handleChange} disabled={disabled}>
                {data.map((item,index) => (


                    <MenuItem value={item} key={index}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
};

export default MySelect;