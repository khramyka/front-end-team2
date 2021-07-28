import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';


interface IStatistic{
    statistic: any
    charts: any
}


const obj: IStatistic ={
    statistic : {},
    charts: {}
}


const reduserStatistic  = createSlice({
    name: "name",
    initialState: obj,
    reducers: {
        resetHistory: state =>  obj,
        setStatistic(state, actions: PayloadAction<any>) {
            state = actions.payload;
        },
        setCharts(state, actions: PayloadAction<any>) {
            state = actions.payload;
        },
    },
});

export default reduserStatistic.reducer;

export const {
    setStatistic
} = reduserStatistic.actions; 