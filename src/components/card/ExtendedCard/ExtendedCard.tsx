import React from "react";
import "./ExtendedCard.scss";
import PhoneIcon from "@material-ui/icons/Phone";
import Button from "@material-ui/core/Button";
/*import Rating from "../../common/SearchBar/Rating/Rating";*/
import CloseIcon from "@material-ui/icons/Close";

const ExtendedCard: React.FC = () => {
    const handleClick = () => {
        const myElement: HTMLElement | null =
            document.querySelector(".ExtendedCard");
        if (myElement === null) {
            alert("Fuck");
        } else {
            myElement.style.display! = "none";
        }
    };

    return (
        <div className="ExtendedCard" id="excard">
            <Button
                id="closebtn"
                variant="outlined"
                color="secondary"
                onClick={handleClick}
                endIcon={<CloseIcon color="secondary" />}
            >
                Close
            </Button>

            <div className="ExtendedCard__Header">
                <div className="ExtendedCard__Logo">
                    <img
                        className="ExtendedCard__Image"
                        alt="Brand promo image"
                        src="https://china-review.com.ua/uploads/posts/2017-05/1496088872_mi-store4.jpg"
                    />
                </div>
                <div className="ExtendedCard__Info">
                    <div className="brandTitle">
                        <h3 className="brandName">
                            Mi-mi store <span className="discount">-50%</span>
                        </h3>

                    </div>
                    <div className="valid">
                        <span className="valid__INfo">
            valid until<strong className="valid__Date">05 May 2021</strong>
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
                        <button type="submit" className="submit btn--extCard">
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
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
                        alias et facilis quia repudiandae sequi? Doloribus id quae rerum
                        tenetur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
                        alias et facilis quia repudiandae sequi? Doloribus id quae rerum
                        tenetur.
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
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                        exercitationem facilis praesentium saepe. Deserunt, perspiciatis.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ExtendedCard;