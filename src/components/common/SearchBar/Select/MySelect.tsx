
import React,{useState} from 'react';
import {FormControl, Select, InputLabel, MenuItem, FormHelperText } from "@material-ui/core";
import "./Select.scss"
import {addChipMain, updateChipMain,updateChipStatistic, removeCategoryMain,removeChipMain, addChipStatistic,removeChipStatistic} from "../../../../store/chipReducer";
import {useAppDispatch,useAppSelector} from '../../../../store/Redux-toolkit-hook';
import { useLocation } from "react-router-dom";
import { MAIN_ROUTE } from "../../../../utils/consts"


const MySelect = ({clName,data, id, name, localName, setAble, isCategory, disabled, helperText}:{ helperText:string, isCategory: boolean, disabled: boolean ,clName:string, data:string[], id: string, name:string,localName:string, setAble:any}) => {
    const { pathname } = useLocation();
    const [age, setAge] = useState("");
    const [age2, setAge2] = useState("");
    const dispatch = useAppDispatch()
    const chipDataMain = useAppSelector(state => state.chips.ChipsArray)
    const chipDataStatistic = useAppSelector(state => state.chips.ChipsArrayStatistic)

    const handleChange = (event: React.ChangeEvent<{ value: any }>, index: any) => {
        const numberChip = event.target.value
        const newChip = {[numberChip]: [], name: name, id: id}
        if (pathname === MAIN_ROUTE){
            if (isCategory){
                dispatch(removeCategoryMain({name: numberChip, id: id, isCategory}))
                dispatch(addChipMain([numberChip, id]))
            }
            else {
                dispatch(removeChipMain({id}))
                dispatch(addChipMain(newChip))
            }
            setAge(event.target.value);
            setAble(event.target.value)
        }
        else {

            dispatch(removeChipStatistic(numberChip))
            dispatch(addChipStatistic(newChip))
            setAge2(event.target.value);
            setAble(event.target.value)

        }

    };


    const filterChips = () => {
        let data = []
        if (pathname===MAIN_ROUTE) data = chipDataMain
        else data = chipDataStatistic
        if (!isCategory) {
            let list = ''
            for (const i in data) {
                if (data[i].name === name) {
                    setAble && setAble(Object.keys(data[i])[0]);
                    list = Object.keys(data[i])[0]
                }
            }
            return list
        }
        else if (isCategory) {
            let list = ''
            for (const i in data) {
                if (data[i].id === id) {
                    setAble && setAble(data[i][Object.keys(data[i])[0]].toString());
                    list = data[i][Object.keys(data[i])[0]].toString()
                }
            }
            return list
        }

    }



    return (
        <FormControl className={clName} >
            <InputLabel id="select">
                {localName}
            </InputLabel>
            <Select labelId="select" value={filterChips()} onChange={handleChange}>
                {data.map((item, index) => (
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