import React, { useState } from "react";
import {
  Input,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@material-ui/core"
import {useLocation} from "react-router-dom";
import {MAIN_ROUTE} from "../../../../utils/consts"

import { useAppDispatch, useAppSelector } from '../../../../store/Redux-toolkit-hook';
import { addChip, removeChip } from '../../../../store/chipReducer';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const SelectMultiple = ({ clName, data, name, setArrTag }: { clName: string, data: string[], name: string, setArrTag?: any }) => {
   const {pathname} = useLocation();
  const [personName, setPersonName] = useState<string[]>([]);
   const handleChange = (event: React.ChangeEvent<{ value: any }>,index:any) => {
        if (pathname === MAIN_ROUTE) {
          const numberChip = event.target.value
          const indexChip = index.key.slice(2)
          if (index.props.children[0].props.checked === false){
            const newChip = {id: name+indexChip,label: numberChip[numberChip.length - 1]}
            dispatch(addChip(newChip))
          } else {
            dispatch(removeChip(name+indexChip))
          }
        }else {
          setPersonName(event.target.value)
        }

    };
    const filterChips = ():any => {
      if (pathname === MAIN_ROUTE) {
        const list = []
        for (const i in chipData) {
          if (chipData[i].id.slice(0,4) === name.slice(0,4)){
            list.push(chipData[i].label)
          }
        }
        return list
      }
      else {
        return personName
      }

    }
    const chipData = useAppSelector(state => state.chips.ChipsArray)
    const dispatch = useAppDispatch();
    return (
        <>
        <FormControl className={clName}>
            <InputLabel id="demo-mutiple-checkbox-label">{name}</InputLabel>
            <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={filterChips()}
                onChange={handleChange}
                input={<Input />}
                renderValue={(selected) => (selected as string[]).join(', ')}
                MenuProps={MenuProps}
            >
                {data.map((name:string,index) => (
                    <MenuItem key={index} value={name} >
                        <Checkbox checked={filterChips().indexOf(name) > -1} />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        </>
    );
  // const [personName, setPersonName] = useState<string[]>([]);
  // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setPersonName(event.target.value as string[]);
  //   setArrTag && setArrTag(event.target.value as string[]);
  }

    // return (
    //     <FormControl className={clName}>
    //     <InputLabel id="demo-mutiple-checkbox-label">{name}</InputLabel>
    //     <Select
    //       labelId="demo-mutiple-checkbox-label"
    //       id="demo-mutiple-checkbox"
    //       multiple
    //       value={personName}
    //       onChange={handleChange}
    //       input={<Input />}
    //       renderValue={(selected) => (selected as string[]).join(', ')}
    //       MenuProps={MenuProps}
    //     >
    //       {data.map((name:string) => (
    //         <MenuItem key={name} value={name}>
    //           <Checkbox checked={personName.indexOf(name) > -1} style={{ color: "#0082CA" }}/>
    //           <ListItemText primary={name} />
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   </FormControl>
    // );
    // }

export default SelectMultiple;