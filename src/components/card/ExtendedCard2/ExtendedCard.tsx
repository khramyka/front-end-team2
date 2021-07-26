import React from "react";
import "./ExtendedCard.scss";
import PhoneIcon from "@material-ui/icons/Phone";
import Button from "@material-ui/core/Button";
/*import Rating from "../../common/SearchBar/Rating/Rating";*/
import CloseIcon from "@material-ui/icons/Close";
import {makeStyles} from "@material-ui/core/styles";
import {usedDiscount, getDiscountsHistory} from "../../../http/discountApi";
import { useAppSelector, useAppDispatch} from "../../../store/Redux-toolkit-hook";
import {setDiscountsHistory} from "../../../store/filtersStore"
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {Submitbutton} from "../../index";
interface ExtendedCardProps {
    discount: {
        place: string,
        nameDiscount: string,
        sizeDiscount: string,
        date: string
    }
}
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
        padding: "40px 40px 20px 40px",
    },
    btn: {
        // backgroundColor: theme.palette.secondary.light,
        // color: theme.palette.secondary.main
    },

    icon: {
        color: 'black',
    },

}));

const ExtendedCard: React.FC<ExtendedCardProps> = ({discount}) => {
    const dispatch = useAppDispatch();
    const {vendor, searchObjectHistory} = useAppSelector(state=>state.filters);
    const {vendorLocations} = discount;
    const location = vendorLocations.map(item => Object.values(item).splice(0,3).join(" "));
    const classes = useStyles()
    const handleClick = () => {
        const myElement: HTMLElement | null =
            document.querySelector(".ExtendedCard");

        const mainContent: HTMLElement | null =
            document.querySelector(".main-content");


        if (myElement === null) {
            alert("nothing");
        } else {
            myElement.style.zIndex = "-1";
            myElement.style.opacity = "0";
            myElement.style.position = "absolute";

            if (mainContent === null) {
                return null;
            }  else {
                mainContent.style.opacity = "1";
                mainContent.style.zIndex = "0";
                mainContent.style.position = "relative";

                (() => {

                    mainContent.style.marginTop = '';
                })();

            }
        }
    };

    const usedDiscountAndSetHistory = async(id) =>{
        const {status} = await usedDiscount(id);
        if(status >= 200 && status <= 299){
            getDiscountsHistory(searchObjectHistory).then(resolve=> dispatch(setDiscountsHistory(resolve.data.content))).catch(f=> console.log(f));
        }
    }

    const date = new Date(discount?.endDate * 1000);
    return (
            <div className={`ExtendedCard ${classes.root}`} id="excard">
                <div className={"ExtendedCard__btn"}>
                    <Button
                        id="closebtn"
                        className={classes.btn}
                        variant="outlined"
                        // color="secondary"
                        onClick={handleClick}
                        endIcon={<CloseIcon className={classes.icon} />}
                    >
                        Close
                    </Button>
                </div>

                    <div className="ExtendedCard__Header">
                        <div className="ExtendedCard__Logo">
                            <img
                                className="ExtendedCard__Image"
                                alt="Brand promo image"
                                src={discount?.imageLink}
                            />
                        </div>
                        <div className="ExtendedCard__Info">
                            <div className="brandTitle">
                                <h3 className="brandName">
                                    {discount?.name} <span className="discount">-{`${discount?.percentage}%`}</span>
                                </h3>

                            </div>
                            <div className="valid">
                        <span className="valid__INfo">
            valid until<strong className="valid__Date">{date.toLocaleDateString()}</strong>
          </span>{" "}
                            </div>
                            <div className="">
                                <><LocationOnIcon style={{color: "red"}}/>{ location.join(", ")}</>
                            </div>

                            <div className="shortDescription">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                </p>
                            </div>
                            {/*     <div className="ExtendedCard__Rating">
                        <Rating />
                    </div>*/}
                            {/*<div className="contacts">
                        <PhoneIcon color="primary" />
                        <span className="number">095 567 8778</span>
                    </div>*/}

                            <div className="ExtendedCard__actions">
                                <Submitbutton classN={"submit btn--extCard"} name={"Use Coupon"} handleClick={()=> {usedDiscountAndSetHistory(discount?.id)}}/>
                                {/* <Button variant="contained" color="primary">
                            Use Coupon
                        </Button>*/}
                                {/* <span className="couponsLeft">5 coupons left</span>*/}
                            </div>
                        </div>
                    </div>

                    <div className="ExtendedCard__Description">
                        <h3>
                            Description{" "}

                        </h3>

                        <div>
                            <p>
                                {discount?.fullDescription}
                            </p>
                        </div>
                    </div>

                    <div className="ExtendedCard__Location">
                        <h3>Find us on Google maps</h3>
                        <div className="map-responsive">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20188.81020188539!2d25.351465294328282!3d50.76442657852147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4725972d3b3e3d11%3A0xc98555ed40df010b!2sMi%20Store!5e0!3m2!1suk!2sua!4v1623845351797!5m2!1suk!2sua"
                                width="600"
                                height="450"
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    <div className="ExtendedCard__Footer">
                        <h3>About mi store</h3>
                        <div>
                            <p>
                                {vendor.filter(item => item.id === discount?.vendorId).map(item=>item.description)}
                            </p>
                        </div>
                    </div>
            </div>

    );
};

export default ExtendedCard;