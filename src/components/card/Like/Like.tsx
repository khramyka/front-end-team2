import React,{Fragment,useState,FC} from 'react';
import './Like.scss'
import {VKShareButton,TelegramShareButton,FacebookShareButton} from 'react-share'
import {VKIcon,FacebookIcon,TelegramIcon} from "react-share";
import Menu from "@material-ui/core/Menu";
import { Box } from '@material-ui/core';
import { Drawer } from '@material-ui/core';

interface LikeProps {
    discount?: {
        place: string,
        nameDiscount: string,
        sizeDiscount: string,
        date: string
    }
}

const Like: FC<LikeProps> = ({discount}) => {
    const [state, setState] = useState({
        firstModal: false,
        secondModal: false,
        }
    )
    const cardMore = () => {
        setState(prev => {
            return {
                ...prev,
                firstModal: !state.firstModal
            }
        })
    }
    const cardMoreSocial = () => {
        setState(prev => {
            return {
                ...prev,
                secondModal: !state.secondModal
            }
        })
    }
    /*onClick={()=>{setState(prev=>{return {...prev,firstModal:false,secondModal: false}})}}*/
    const deActivateMode = (e: any) => {
        if(e && e.relatedTarget){
            e.relatedTarget.click();
        }
        setState(prev => {
            return{
                ...prev,
                firstModal: false,
                secondModal: false
            }

        })
    }




    return (
        <Fragment >
            <div className="card-buttons">
                <button className="card-buttons__item">
                    <img src="image/icons/Like.svg" alt=""/>
                </button>
                <button className="card-buttons__item" onClick={cardMoreSocial} onBlur={deActivateMode} >
                    <img src="image/icons/Share.svg" alt=""/>
                </button>
                <button className="card-buttons__info" onClick={cardMore} >
                    <img src="image/icons/Info.svg" alt=""/>
                </button>
            </div>
            {state.firstModal===true ? (
                    <div className="card-container">
                        <div className="card-drop" onClick={()=>{setState(prev=>{return {...prev,firstModal:false,secondModal: false}})}}/>
                        <div className="card-more">
                            <button className="card-more__item">
                                <img src="image/icons/Like-back.svg" alt=""/>
                            </button>
                            <button className="card-more__item" onClick={cardMoreSocial} onBlur={deActivateMode} >
                                <img src="image/icons/Share-back.svg" alt=""/>
                            </button>
                            <button className="card-more__item">
                                <img src="image/icons/Remake-back.svg" alt=""/>
                            </button>
                            <button className="card-more__item" onClick={cardMore}>
                                <img src="image/icons/Close-back.svg" alt=""/>
                            </button>
                        </div>
                    </div>

                ) :
            null}
            {state.secondModal===true ? (
                <div className="card-container">
                    <div className="card-drop" />
                    <div className="card-more" >
                        <FacebookShareButton onClick={(e)=>e.stopPropagation()}
                            url="https://github.com/khramyka/front-end-team2/tree/SearchBar/public">
                            <FacebookIcon  size = {45} round={true}></FacebookIcon>
                        </FacebookShareButton>
                        <TelegramShareButton onClick={(e)=>e.stopPropagation()}
                            url="https://github.com/khramyka/front-end-team2/tree/SearchBar/public">

                            <TelegramIcon size = {45} round={true}></TelegramIcon>
                        </TelegramShareButton>
                        <VKShareButton onClick={(e)=>e.stopPropagation()}
                            url="https://github.com/khramyka/front-end-team2/tree/SearchBar/public">

                            <VKIcon size = {45} round={true}></VKIcon>
                        </VKShareButton>
                    </div>
                </div>

                ):null}

        </Fragment>

    );
};

export default Like;