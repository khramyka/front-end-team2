import React,{useState,useEffect} from "react";
import { Bar, Doughnut, Pie, PolarArea, } from 'react-chartjs-2';
import "./Charts.scss";
import {getStatisticGrafic} from "../../../http/discountApi"
import { TreeItem } from "@material-ui/lab";

const Charts = () => {
    const [state, setState] = useState()

    useEffect(() => {
       getStatisticGrafic().then(resolve => setState(resolve.data)); 
    }, []);
     console.log(state);
    const backgroundColor =['rgba(255, 99, 132, 0.4)',
                        'rgba(54, 162, 235, 0.4)',
                        'rgba(255, 206, 86, 0.4)',
                        'rgba(75, 192, 192, 0.4)',
                        'rgba(153, 102, 255, 0.4)',
                        'rgba(255, 159, 64, 0.4)']
    const borderColor =['rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)']

    


    const dataCategories:any ={
                labels: [],
                datasets: [
                {label: "Best Categories",
                data : [],
                backgroundColor : [],
                borderColor : [],
                borderWidth: 1 ,}   
                ],
                };
    const dataDiscounts:any ={
                labels: [],
                datasets: [
                {label: "Best Discounts" ,
                data : [],
                backgroundColor : [],
                borderColor : [],
                borderWidth : 1}
                ],
                };
    const dataVendors:any ={
                labels: [],
                datasets: [
                   { label :"Best Vendors",
                    borderWidth : 1,
                    data : [],
                    backgroundColor : [],
                    borderColor : [],}
                ],
                };

    
    const createData = (data, obj) => {
        console.log(obj)
        data.map((item, index) => {
            obj.labels.push(item.name);
            obj.datasets[0].data.push(item.usageCount);
            obj.datasets[0].backgroundColor.push(backgroundColor[index]);
            obj.datasets[0].borderColor.push(borderColor[index]);    
            })
        return obj;
    }

    const [stateCategories, setStateCategories] = useState();
    const [stateDiscounts, setStateDiscounts] = useState();
    const [stateVendors, setStateVendors] = useState()
    
    useEffect(() => {
        if(state){
            setStateCategories(createData(state.bestCategories, dataCategories));
            setStateDiscounts(createData(state.bestDiscounts, dataDiscounts));
            setStateVendors(createData(state.bestVendors, dataVendors));
        }
    }, [state]);
    const [data, setData] =useState();

    useEffect(() => {
        setData(stateCategories)
    }, [stateCategories])

const [Arr, setArr] = useState()
    useEffect(() => {
        const arr = [<Bar type="bar" data={data} options={options}/>,
                <Doughnut type="doughnut" data={data} options={options} />,
                <Pie type="pie" data={data} options={options}/>,
                <PolarArea type="polarArea" data={data} options={options} />,]
        setArr(arr)
    }, [data])
    const options: any = {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks:{
                            beginAtZero: true,
                        }
                    }]
                }
            }
    const [diagram, setDiagram] = useState();

    useEffect(() => {
        if(Arr){
            setDiagram(Arr[0])
        }
    }, [Arr]);
    console.log(Arr)
    return (
        <div className="BarCharts">
            <div className="container-btn">
            <button  onClick={()=> setData(stateCategories)}>Best Categories</button>
            <button  onClick={()=> setData(stateDiscounts)}>Best Discounts</button>
            <button  onClick={()=> setData(stateVendors)}>Best Vendors</button>
        </div>
        <div className="Charts">
           {diagram ? diagram : <Bar type="bar" data={data} options={options}/>}
        </div>
        <div className="container-btn">
            <button  onClick={(()=>setDiagram(Arr[0]))}>Bar</button>
            <button  onClick={(()=>setDiagram(Arr[1]))}>Doughnut</button>
            <button  onClick={(()=>setDiagram(Arr[2]))}>Pie</button>
            <button  onClick={(()=>setDiagram(Arr[3]))}>PolarArea</button>
        </div>
        
        </div>
        )
};

export default Charts;
