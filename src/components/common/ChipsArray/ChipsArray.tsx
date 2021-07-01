import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import {useAppDispatch,useAppSelector} from '../../../store/Redux-toolkit-hook'
import {addChip,removeChip,removeCategory} from '../../../store/chipReducer'

interface ChipData {
    all: any[],
    category: any[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            listStyle: 'none',
            margin: 0,
            boxShadow: 'none',
            background: "transparent"
        },
        chip: {
            margin: theme.spacing(0.5),
            backgroundColor: "#AAF4C3"
        },
    }),
);

export default function ChipsArray() {
    const classes = useStyles();
    // const chipData = useAppSelector(state => state.chips.ChipsArray)
    const chipData = useAppSelector(state => state.chips.ChipsArray)
    const categoryData = useAppSelector(state => state.chips.category)
    const dispatch = useAppDispatch()

    const handleDelete = (id: string) =>{
        dispatch(removeChip(id))
        dispatch(removeCategory(id))
    };

    return (
        <Paper component="ul" className={classes.root}>
            {chipData ? chipData.map((item,index) => {
                return (
                    <li key={index}>
                        <Chip
                            label={item.label}
                            onDelete={()=>handleDelete(item.id)}
                            className={classes.chip}
                        />
                    </li>
                );
            }): null}
            {categoryData ? categoryData.map((item,index) => {
                return (
                    <li key={index}>
                        <Chip
                            label={item.label}
                            onDelete={()=>handleDelete(item.id)}
                            className={classes.chip}
                        />
                    </li>
                );
            }): null}
        </Paper>
    );
}