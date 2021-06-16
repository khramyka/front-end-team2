import React from 'react';
import { Graph, GraphPanel } from '../../../index';
import style from "./GraphInfo.module.scss";

const GraphInfo = () => {
    return (
        <div>
            GraphInfo
            <Graph/>
            <GraphPanel/>
        </div>
    );
};

export default GraphInfo;