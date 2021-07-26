import React, { useState, useRef} from "react";
import "./FormLogin.scss";
import { login, getUserDetails,} from "../../../http/userApi";
import { useHistory } from "react-router-dom";
import { MAIN_ROUTE, LOGIN_ROUTE, FIRST_ROUTE } from "../../../utils/consts";
import {Visibility , VisibilityOff } from "@material-ui/icons";
import {TextField, FormControl, IconButton,  OutlinedInput , InputLabel , InputAdornment   } from "@material-ui/core";
import {useAppDispatch,} from "../../../store/Redux-toolkit-hook"
import {setEmail, setIsAuth, setUserId, setAdmine, setUserName, setLocation} from "../../../store/userSlise"
import {Submitbutton} from "../../index"
import ReCAPTCHA from "react-google-recaptcha";


const FormLogin: React.FC = () => {
    const history: any = useHistory();
    const emailErrorTextRef: any = useRef(null);
    const dispatch = useAppDispatch();
    const recaptchaRef: any = useRef<ReCAPTCHA>(null);
    
    const  regularEmail: any = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; 
    const regularPassword: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;
    interface IData {
        email: string,
        password: string
    }
    const [data, setData] = useState<IData>({email:"", password: ""})
    const [visible,setVisible] = useState<boolean>(false)
    const [captcha, setCaptcha] = useState<boolean>(false)
    const [isVerified, setVerified] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const checkForm = (e:any) => {
        e.preventDefault()
        if(regularEmail.test(data.email) && regularPassword.test(data.password)) {
            checkCaptcha();
        } else {
            showError();
            setCaptcha(true);
        }
    }
    const checkCaptcha = () => {
        if(isVerified) {
            setOpen(true)
            signIn()
        } 
    }
    const onChange = () => {
        setVerified(true);

    }
    const onError = () => {
        setVerified(false);
    }

    const signIn = async () =>{
        try{
            const user: any = await login(data);
            dispatch(setEmail(user.sub));
            dispatch(setIsAuth(true));
            dispatch(setAdmine(user.admin));
            dispatch(setUserId(user.userId));

            getUserDetails(user.userId).then(data => {
            dispatch(setUserName(data.name));
            data.locationId && dispatch(setLocation(data.location));
            });
            redirect();
        }catch(e){
            showError()
            setOpen(false)
        }
    }

    const redirect = () =>{
        FIRST_ROUTE ===  LOGIN_ROUTE ?  history.push(MAIN_ROUTE): history.push(FIRST_ROUTE)
    }

    const showError = () => {
        if(emailErrorTextRef.current){
            emailErrorTextRef.current.style.visibility="visible";
        }
    }

    const hideError =() => {
        emailErrorTextRef.current.style.visibility="hidden"
    }

    return (
        <form className="FormLogin">
            <TextField
                label="Email"
                type="email"
                autoComplete="current-password"
                variant="outlined"
                size="small"
                onChange = {(e:React.ChangeEvent<HTMLInputElement>) => setData({...data, email: e.target.value})}
                onFocus = {hideError}
            />
            <p ref = {emailErrorTextRef} >
                The email or password you entered isn’t connected to any
                account. Find your account and log in.
            </p>
            
        <FormControl  variant="outlined" size="small">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={visible ? 'text' : 'password'}
            value={data.password}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setData({...data, password: e.target.value})}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>setVisible(!visible)}
                  edge="end"
                >
                  {visible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <input type="submit" onClick={(e)=> checkForm(e)}  hidden/>

            <div id={"captcha"}>
                <ReCAPTCHA
                    sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                    ref={recaptchaRef}
                    onChange={onChange}
                    onExpired={onError}
                    hl={"en"}
                />
            </div>


        <Submitbutton classN={"submit"} name={"Log in"} handleClick={(e:any)=> checkForm(e)} open={open} setOpen={setOpen}/>
            
        </form>
    );
};

export default FormLogin;