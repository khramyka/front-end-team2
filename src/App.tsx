import React,{useEffect,useState} from 'react';
import { BrowserRouter} from "react-router-dom";
import { AppRouter, Footer, Header, Spinner} from './components';
import "./style/main.css";
import { useAppSelector, useAppDispatch} from "./store/Redux-toolkit-hook"; 
import {getUserDetails} from './http/userApi';
import { setIsAuth,} from "./store/userSlise";


const  App = () => {
  const dispatch = useAppDispatch();
  const {isAuth,userId} = useAppSelector(state => state.user);
  const [loading, setLoading] =useState<boolean>(true);

  useEffect(() => {
    getUserDetails(userId).then((resolv) =>{
      dispatch(setIsAuth(true));
    }).catch((f)=>dispatch(setIsAuth(false))).finally(() => setLoading(false));
  },[]);



  

  if(loading){
    return <Spinner/>
  }

    return (
        <div className={"app-wrapper"}>
            <BrowserRouter>
                {isAuth && <Header />}
                <div className={"app-wrapper-container"}>
                    <AppRouter />
                </div>
                {isAuth && <Footer/>}
            </BrowserRouter>
        </div>
    );
}

export default App;
