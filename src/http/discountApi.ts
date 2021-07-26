import {authHost, host} from "./index";

interface Idiscount{
    name: string;
    vendorId: string;
    fullDescription: string;
    isOnline:boolean;
    imageLink:string;
    startDate:string;
    endDate: string;
    subCategoryIds: string[];
    locationIds: string[];
    categoryId: string;
    percentage: number;
}

interface IdiscountFilter{
    page: number;
    size: number;
    vendorIds: string[];
    categoryId: string;
    country: string;
    city: string;
    searchWord: string;
    subCategoriesIds: string[];
    favourite: boolean;
}

interface IdiscountFilterHistory{
    page: number;
    size: number;
    startDate: string,
    endDate: string
}

export const postDiscount = async ( obj:Idiscount) =>{
    const data = await authHost.post(`/discount`, obj);
    return data;
};

export const putDiscount = async (idDiscount: string, obj:Idiscount) =>{
    const data = await authHost.put(`/discount/${idDiscount}`, obj);
    return data;
};

export const deleteDiscount = async (idDiscount: string,) =>{
    const data = await authHost.delete(`/discount/${idDiscount}`);
    return data;
};

export const getDiscountById = async ( idDiscount: string) =>{
    const data = await authHost.get(`/discount/${idDiscount}`);
    return data;
};

const getstring = (startString, obj) =>{
    const arrObj = Object.entries(obj);
    const string = arrObj.reduce((previousValue, item) => {
        let str =``
        if(item[1] === undefined||item[1]===""){
            return previousValue;
        }
        if(Array.isArray(item[1])){
          item[1].forEach(i =>{
            str +=`${item[0]}=${i}&`;
          })  
        }else{
           str += `${item[0]}=${item[1]}&`
        } 
        return previousValue += str;
    },startString);
    return string
}

export const getDiscounts = async (obj:IdiscountFilter ) =>{
    const string = getstring(`/discount/get_discounts?`, obj);
    const data = await authHost.get(string.slice(0,string.length-1));
    return data;
};

export const getDiscountsHistory = async (obj:IdiscountFilterHistory ) =>{
    const string = getstring(`/statistic/history?`, obj)
    const data = await authHost.get(string.slice(0,string.length-1));
    return data;
};


export const usedDiscount =  async(idDiscount: string) => {
    const data = await authHost.post(`/discount/use_discount/${idDiscount}`);
    return data;
};

export const postfavoriteDiscount = async(idDiscount: string)=>{
    const data = await authHost.post(`/discount/${idDiscount}/favorite`);
    return data;
}

export const deletefavoriteDiscount = async(idDiscount: string)=>{
    const data = await authHost.delete (`/discount/${idDiscount}/favorite`);
    return data;
}