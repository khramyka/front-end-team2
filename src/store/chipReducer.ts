import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

interface IinitialUserState {
    ChipsArray: any[]
    category: any[]
}

export const initialUserState: IinitialUserState={
    ChipsArray: [],
    category: [],


}

const chipReducer = createSlice({
    name: "userSlise",
    initialState: initialUserState,
    reducers: {
        addChip(state, actions: PayloadAction<any>) {
            state.ChipsArray = [...state.ChipsArray, actions.payload];
        },
        addCategory(state, actions: PayloadAction<any>) {
            state.category = [...state.category, actions.payload];
        },
        removeChip(state, actions: PayloadAction<any>) {
            state.ChipsArray = [...state.ChipsArray.filter(item=>item.id !== actions.payload)]
        },
        removeCategory(state, actions: PayloadAction<any>) {
            state.category = [...state.category.filter(item=>item.id !== actions.payload)]
        },
    },
});

export default chipReducer.reducer
export const { addChip,addCategory,removeChip,removeCategory } = chipReducer.actions;