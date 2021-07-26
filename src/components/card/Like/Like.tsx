import React, { Fragment, useState, FC } from 'react';
import './Like.scss'
import { VKShareButton, TelegramShareButton, FacebookShareButton } from 'react-share'
import { VKIcon, FacebookIcon, TelegramIcon } from "react-share";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AdminPanelCard from '../../admin/AdminPanelCard/AdminPanelCard';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles, Popover } from '@material-ui/core';
import ModalWithConfirm from "../../common/ModalWithConfirm/ModalWithConfirm";
import SnackbarForModalWithConfirm from "../../common/SnackbarForModalWithConfirm/SnackbarForModalWithConfirm";
import {t} from "ttag";
import {deletefavoriteDiscount, postfavoriteDiscount, deleteDiscount, getDiscounts} from "../../../http/discountApi"
import {useAppSelector, useAppDispatch} from "../../../store/Redux-toolkit-hook"
import {setDiscountLike,  addDiscounds} from "../../../store/filtersStore"
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
    const {searchObject} = useAppSelector(state => state.filters)
    const isAuth = useAppSelector(state => state.user.isAuth);
    const [openModal, setOpenModal] = useState(false);
    const [openSnackbar, setSnackbar] = useState(false);
    const dispatch = useAppDispatch();

    const handlerDeleteCard = () => {
        deleteCard();
        setSnackbar(true);
    }

    const deleteCard = async() => {
        const {status, data} = await deleteDiscount(props.discount.id); 
        if(status <= 200 || status >= 299){
            const {data} = await getDiscounts(searchObject)
            dispatch(addDiscounds(data))
            handleClose()
        } 
        else{

        }
    }
    const [like, setLike] = useState();
    setTimeout(()=> setLike(props.discount.liked),50)
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [anchorShareEl, setAnchorShareEl] = React.useState<HTMLButtonElement | null>(null);
    const [anchorMoreEl, setAnchorMoreEl] = React.useState<HTMLButtonElement | null>(null);

    const handleLike = () => {
        like ? deletefavoriteDiscount(props.discount.id) : postfavoriteDiscount(props.discount.id);
        dispatch(setDiscountLike(props.discount.id))
        setLike(prev => !prev);
    }



    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorMoreEl(null)
        setAnchorShareEl(event.currentTarget);
    };
    const handleChang = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(null);
        setAnchorMoreEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setAnchorShareEl(null)
        setAnchorMoreEl(null)
    };

    const id = anchorEl ? 'simple-popover': anchorShareEl ? 'simple-popover' : anchorMoreEl ? 'simple-popover' : undefined;
    const useStyles = makeStyles((theme) =>({
        root: {
            '& .MuiPopover-paper': {
                padding: '7px 10px',
                display: 'flex',
                gridGap: '13px',
                justifyContent: 'center'
            }
        },
        mf: {
            fill: like? '#0082CA' : theme.palette.secondary.main
        }
    }))
    const style = useStyles();

    return (
        <Fragment>


            <div className="card-buttons">
                <button className="card-buttons__item" onClick={handleLike}>
                    <svg id="svg1" width="30px" height="28px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart"
                         className="svg-inline--fa fa-heart fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 512 512">
                        <path className={style.mf} fill={like? "#0082CA" : "white"} stroke="#0082CA" stroke-width="35px"
                              d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                    </svg>
                </button>
                <div className="settings-wrapper">
                    <button className="card-buttons__item" aria-describedby={id} onClick={handleChange}>
                        <img src="image/icons/Share.svg" alt="" />
                    </button>
                    <Popover id={id}
                             open={Boolean(anchorShareEl)}
                             anchorEl={anchorShareEl}
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
                        <FacebookShareButton
                            url="https://github.com/khramyka/front-end-team2/tree/SearchBar/public">
                            <FacebookIcon size={45} round={true}></FacebookIcon>
                        </FacebookShareButton>
                        <TelegramShareButton
                            url="https://github.com/khramyka/front-end-team2/tree/SearchBar/public">
                            <TelegramIcon size={45} round={true}></TelegramIcon>
                        </TelegramShareButton>
                        <VKShareButton
                            url="https://github.com/khramyka/front-end-team2/tree/SearchBar/public">
                            <VKIcon size={45} round={true}></VKIcon>
                        </VKShareButton>
                    </Popover>
                </div>
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
                        open={Boolean(anchorEl)}
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
                        <AdminPanelCard currentCard={props.discount}
                            style={{ fontSize: 30, position: 'relative', bottom: '5px' }} />
                        <DeleteOutlineIcon style={{ color: '#d32f2f', fontSize: 30, cursor: 'pointer' }}
                           /* onClick={() => deleteCard(props.discount)} />*/
                            onClick={()=> {setOpenModal(true)}} />



                    </Popover>
                </div>
                <button className="card-buttons__info" onClick={handleChang}>
                    <img src="image/icons/Info.svg" alt="" />
                </button>
                <Popover id={id}
                         open={Boolean(anchorMoreEl)}
                         anchorEl={anchorMoreEl}
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
                    <button className="card-more__item" onClick={handleLike}>
                        <svg id="svg1" width="30px" height="28px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart"
                             className="svg-inline--fa fa-heart fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path fill={like? "#0082CA" : "white"} stroke="#0082CA" stroke-width="35px"
                                  d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                        </svg>
                    </button>
                    <button className="card-more__item" aria-describedby={id} onClick={handleChange}>
                        <img src="image/icons/Share.svg" alt="" />
                    </button>
                    {isAuth && <><button className="card-more__item" onClick={()=>console.log("onClick")}>
                        <AdminPanelCard currentCard={props.discount} style={{ fontSize: 30, position: 'relative', bottom: '5px' }} />
                    </button>
                    <button className="card-more__item" onClick={()=>{}}>
                        <DeleteOutlineIcon style={{ color: '#d32f2f', fontSize: 30 }} onClick={() => {setOpenModal(true)}} />
                    </button></>}
                </Popover>
            </div>

                <ModalWithConfirm
                    setModalState={setOpenModal}
                    modalState={openModal}
                    title={t`Are you sure?`}
                    description={t`Deleted promo will not be recoverable!`}
                    action={handlerDeleteCard}
                />
                <SnackbarForModalWithConfirm
                    setSnackbar={setSnackbar}
                    snackbarState={openSnackbar}
                    successMessage={t`Promo was successfully deleted!`}
                    errorMessage={t`Something went wrong...`}
                />
        </Fragment >
    );
};

export default Like;