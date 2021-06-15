import React, { useState, MouseEvent } from "react";
import "./FormLogin.scss";


const FormLogin: React.FC = () => {
    interface IData {
        email: string,
        password: string
    }
    const [date, setDate] = useState<IData>({email:"", password: ""})
    const handleclick = (e:MouseEvent):void => {
        console.log(date);
    }
    return (
        <form className="FormLogin">
            <input
                type="email"
                placeholder="email"
                className="incorrectInput"
                onChange = {(e:React.ChangeEvent<HTMLInputElement>) => setDate({...date, email: e.target.value})}
            />
            <p>
                The email or password you entered isn’t connected to any
                account. Find your account and log in.
            </p>
            <input
                type="password"
                placeholder="password"
                className="formInputPassword"
                onChange = {(e:React.ChangeEvent<HTMLInputElement>) => setDate({...date, password: e.target.value})}
            />
            <button type="submit" onClick={(e:MouseEvent)=>handleclick(e)}> Log in </button>
        </form>
    );
};

export default FormLogin;