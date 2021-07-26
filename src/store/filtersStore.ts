import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

interface IdiscountFilter{
    page: number;
    size: number;
    vendorIds: string[];
    categoryId: string;
    country: string;
    city: string;
    searchWord: string;
    subCategoriesIds: string[];
    sortingType: string;
    favourite: boolean;
}

interface historyFilters{
    page: number;
    size: number;
    startDate: string;
    endDate: string
}
interface IinitialState {
    category: any[],
    vendor: any[],
    vendorLocation: any[],
    subCategory: any[],
    discounds: any[],
    numberOfElements: number,
    numberOfElementsHistory: number,
    searchObject: IdiscountFilter,
    idEditCard: string,
    subscribe: any,
    searchObjectHistory: historyFilters,
    discountsHistory: any[],
}

export const initialFiltersState: IinitialState={
    idEditCard: "",
    category: [],
    vendor: [],
    vendorLocation: [],
    subCategory: [],
    discounds: [],
    numberOfElementsHistory: 0,
    numberOfElements: 0,
    subscribe: "",
    searchObject: {
        favourite : false,
        page: 0,
        size: 15,
        vendorIds:[],
        categoryId: "",
        country: "",
        city: "",
        searchWord: "",
        subCategoriesIds: [],
        sortingType: "POPULAR",
    },
    discountsHistory: [],
    searchObjectHistory:{
        page: 0,
        size: 15,
        startDate: "",
        endDate: "",
    }
}

const filtersReducer = createSlice({
    name: "filtersSlise",
    initialState: initialFiltersState,
    reducers: {
        resetFilteState: state =>  initialFiltersState,
        setSearchObject(state, actions: PayloadAction<any>) {
            state.searchObject = {...state.searchObject, ...actions.payload};
        },
        
        setStartDataHistory(state, actions: PayloadAction<string>) {
            state.searchObjectHistory.startDate = actions.payload;
        },
        setEndDataHistory(state, actions: PayloadAction<string>) {
            state.searchObjectHistory.endDate = actions.payload;
        },
        setPageHistory(state, actions: PayloadAction<number>) {
            state.searchObjectHistory.page = actions.payload;
        },
        setFavourite(state) {
            state.searchObject.favourite = !state.searchObject.favourite;
        },
        setDiscountsHistory(state, actions: PayloadAction<any>) {
            state.discountsHistory = [...actions.payload.content];
            state.numberOfElementsHistory = actions.payload.totalElements;
        },
        setDiscountLike(state, actions: PayloadAction<string>) {
            state.discounds = state.discounds.map(item => {
                if(item.id === actions.payload ){
                    item.liked = !item.liked
                }
                return item;
            });
        },
        setIdEditCard(state, actions: PayloadAction<string>) {
            state.idEditCard = actions.payload;
        },
        setSortingType(state, actions: PayloadAction<string>) {
            state.searchObject.sortingType = actions.payload;
        },
        setSearchObjectPage(state, actions: PayloadAction<number>) {
            state.searchObject.page = actions.payload;
        },
        setSearchWord(state, actions: PayloadAction<any>) {
            state.searchObject.searchWord = actions.payload;
        },
        addCategory(state, actions: PayloadAction<any>) {
            state.category = [...actions.payload];
        },
        delateCategory(state, actions: PayloadAction<any>){
            state.category = [...state.category.filter(item => item.id !== actions.payload)];
        },
        delateSubCategory(state, actions: PayloadAction<any>){   
            state.subCategory = [...state.subCategory.filter(item => item.id !== actions.payload )];
            
        },
        addVendor(state, actions: PayloadAction<any>) {
            state.vendor = [...actions.payload];
        },
        
        addDiscounds(state, actions: PayloadAction<any>) {
            state.discounds = [...actions.payload.content];
            state.numberOfElements = actions.payload.totalElements;
        },
        addSubCategory(state, actions: PayloadAction<any>) {
            state.subCategory = [...actions.payload];
        },
        
        addVendorLocation(state, actions: PayloadAction<any>) {
            state.vendorLocation = [...actions.payload];
        },
        addNewCategory(state, actions: PayloadAction<any>) {
            state.category = [...state.category ,actions.payload];
        },
        
        addNewVendor(state, actions: PayloadAction<any>) {
            state.vendor = [...state.vendor,actions.payload];
        },
        
        addNewDiscounds(state, actions: PayloadAction<any>) {
            state.discounds = [...state.discounds,actions.payload];
        },
        addNewSubCategory(state, actions: PayloadAction<any>) {
            state.subCategory = [...state.subCategory,actions.payload];
        },
        
        addNewVendorLocation(state, actions: PayloadAction<any>) {
            state.vendorLocation = [...state.vendorLocation,actions.payload];
        },
        
    },
});

export default filtersReducer.reducer
export const {
    setPageHistory,
    setSortingType,
    setDiscountsHistory, 
    setFavourite,
    setStartDataHistory, 
    setEndDataHistory,
    addCategory,
    delateSubCategory,
    setDiscountLike, 
    delateCategory,
    setIdEditCard,
    addVendor,
    addNewCategory,
    addSubCategory, 
    addNewSubCategory,
    addNewVendorLocation,
    addNewDiscounds, 
    addNewVendor,
    addVendorLocation,
    resetFilteState, 
    addDiscounds, 
    setSearchWord, 
    setSearchObject, 
    setSearchObjectPage,
} = filtersReducer.actions;