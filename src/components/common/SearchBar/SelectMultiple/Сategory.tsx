import React,{useState}from "react"
import {SelectMultiple} from "../../../index"
import {useAppDispatch, useAppSelector} from "../../../../store/Redux-toolkit-hook";

const Сategory = ({clName,data,name}:{clName:string, data: object,name:string}) => {
    
    const [arrTag, setArrTag] = useState<string[]>([])
    const chipData = useAppSelector(state => state.chips.ChipsArray)
    const dispatch = useAppDispatch();

    const addSetArrTag = (tag:any) =>{
        setArrTag(tag);
    }
    const filterChips = ():any => {
        const list = []
        for (const i in chipData) {
            if (chipData[i].id.slice(0,4) === name.slice(0,4)){
                list.push(chipData[i].label)
            }
        }
        return list
    }

    return(
        <>
        <SelectMultiple data={data} clName={clName}  name={name} />
        { filterChips().length>0? filterChips().map((item: string)=>
            <SelectMultiple data={data} clName={clName} name={item}/>
        ): null}
        </>
    );
}

export default Сategory;