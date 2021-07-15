import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
        marginBottom: 15
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

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


function getStyles(name: any, personName: any, theme: any) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function AdminSelect(props: {disabled: boolean ,  name: string, data: string[], multi: boolean, handleChange: any }) {
    const classes = useStyles();
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const [age, setAge] = React.useState('');


    const handleChange = (event: any) => {
        props.multi ?
            setPersonName(event.target.value)
            : setAge(event.target.value)
            props.handleChange(event.target.value)
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel>{props.name}</InputLabel>
                <Select
                    disabled={props.disabled}
                    multiple={props.multi}
                    value={props.multi ? personName : age}
                    onChange={handleChange}
                    input={<Input />}
                    MenuProps={MenuProps}
                >
                    {props.data.map((item) => (
                        <MenuItem key={item} value={item} style={getStyles(item, personName, theme)}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </div>
    );
}