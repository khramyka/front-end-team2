import React from 'react';
import "./Input.scss";

const Input = ( props: { title: string; } ) => {
    return (
        <div className="input">
            <label>
                <input type="text" name="name" placeholder={props.title}/>
            </label>
        </div>
    );
};

export default Input;