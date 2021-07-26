import React from "react";
import "./ExtendedCard.scss";
import PhoneIcon from "@material-ui/icons/Phone";
import Button from "@material-ui/core/Button";
/*import Rating from "../../common/SearchBar/Rating/Rating";*/
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import CloseIcon from "@material-ui/icons/Close";
import {makeStyles} from "@material-ui/core/styles";
import {usedDiscount} from "../../../http/discountApi";
import { useAppSelector, } from "../../../store/Redux-toolkit-hook";
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
    const {vendor} = useAppSelector(state=>state.filters);
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

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
        language: "en"
    })
    const containerStyle = {
        position: "static",
        overflow: "visible"
    };

    const center = {
        lat: discount?.vendorLocations[0].latitude,
        lng: discount?.vendorLocations[0].longitude
    };


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
                                <button className="submit btn--extCard" onClick={()=> usedDiscount(discount?.id)}>
                                    Use Coupon
                                </button>
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
                            {isLoaded ? (
                                <GoogleMap
                                    mapContainerClassName={"maps"}
                                    center={center}
                                    zoom={10}
                                >
                                    {discount?.vendorLocations.map(l => < Marker position={{lat: l.latitude, lng: l.longitude}}
                                                                                 title={`${discount?.name}` + `, ` + `${l.country}` + `, ` + `${l.city}` + `, ` + `${l.addressLine}`} />)}
                                </GoogleMap>
                            ) : <></>
                            }

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