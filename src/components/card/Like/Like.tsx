import React,{Fragment,useState,FC} from 'react';
import './Like.scss'
import { VKShareButton, TelegramShareButton, FacebookShareButton } from 'react-share'
import { VKIcon, FacebookIcon, TelegramIcon } from "react-share";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AdminEditCardPanel from '../../admin/AdminEditCardPanel/AdminEditCardPanel';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles, Popover } from '@material-ui/core';

interface LikeProps {
    discount?: {
        id: number,
        place: string,
        nameDiscount: string,
        sizeDiscount: string,
        date: string
    },
    cards: {
        id: number,
        place: string,
        nameDiscount: string,
        sizeDiscount: string,
        date: string
    }[],
    updateData: (data: any) => void,
}


const Like: FC<LikeProps> = (props) => {
    const [state, setState] = useState({
        firstModal: false,
        secondModal: false
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
    };

    const deleteCard = (currentCard: any) => {
        const filteredArr = props.cards.filter((item: any) => item.id !== currentCard.id);
        props.updateData(filteredArr)
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





    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const useStyles = makeStyles({
        root: {
            '& .MuiPopover-paper': {
                padding: '7px 10px',
                display: 'flex',
                gridGap: '13px'
            }
        }
    })
    const style = useStyles();

    return (
        <Fragment>
            <div className="card-buttons">
                <button className="card-buttons__item">
                    <img src="image/icons/Like.svg" alt=""/>
                </button>
                <button className="card-buttons__item" onClick={cardMoreSocial} onBlur={deActivateMode} >
                    <img src="image/icons/Share.svg" alt=""/>
                </button>
                <div className="settings-wrapper">
                    <button aria-describedby={id} onClick={handleClick} className='settings'>
                        <SettingsIcon style={{
                            color: 'black',
                            fontSize: 35,
                            position: 'relative',
                            left: 6,
                        }} />
                    </button>
                    <Popover id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'right',
                        }}
                        className={style.root}>
                        <AdminEditCardPanel currentCard={props.discount}
                            style={{ fontSize: 30, position: 'relative', bottom: '5px' }} />
                        <DeleteOutlineIcon style={{ color: '#d32f2f', fontSize: 30 }}
                            onClick={() => deleteCard(props.discount)} />
                    </Popover>
                </div>
                <button className="card-buttons__info" onClick={cardMore}>
                    <img src="image/icons/Info.svg" alt="" />
                </button>
            </div>
            {state.firstModal===true ? (
                    <div className="card-container">
                        <div className="card-drop" onClick={()=>{setState(prev=>{return {...prev,firstModal:false,secondModal: false}})}}/>
                        <div className="card-more">
                            <button className="card-more__item">
                                <img src="image/icons/Like.svg" alt="" />
                            </button>
                            <button className="card-more__item" onClick={cardMoreSocial} onBlur={deActivateMode} >
                                <img src="image/icons/Share-back.svg" alt=""/>
                            </button>
                            <button className="card-more__item">
                                <AdminEditCardPanel currentCard={props.discount}
                                    style={{ fontSize: 30, position: 'relative', bottom: '5px' }} />
                            </button>
                            <button className="card-more__item" onClick={cardMore}>
                                <DeleteOutlineIcon style={{ color: '#d32f2f', fontSize: 30 }}
                                    onClick={() => deleteCard(props.discount)} />
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