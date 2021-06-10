import React from 'react';
import './Like.scss'

const Like = () => {
    return (
        <div className="card-buttons">
           <button className="card-buttons__item">
               <img src="image/icons/Like.svg" alt=""/>
           </button>
           <button className="card-buttons__item">
               <img src="image/icons/Share.svg" alt=""/>
           </button>
        </div>
    );
};

export default Like;