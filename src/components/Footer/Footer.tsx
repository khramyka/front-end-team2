import React, {useRef, useState} from 'react';
import {Logo} from '../index';
import "./Footer.scss";
import phone from '../../images/icons/phone.svg';
import email from '../../images/icons/email.svg';
import {Button, Tooltip, withStyles} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import { Theme } from '@material-ui/core';

const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        fontSize: theme.typography.pxToRem(16),

    },
}))(Tooltip);

const Footer = () => {
    /*const classes = useStyles();*/

    const [state, setState] = useState(false)
    const copyLink = () => {
        navigator.clipboard.writeText('info@exadel.com');
        setState(true)
        setTimeout(() => setState(false), 800)
    }
    const copyNumber = () => {
        navigator.clipboard.writeText("+380 2222 222");
        setState(true)
        setTimeout(() => setState(false), 800)
    }

    return (
        <footer className="footer">
            <div className={"footer__container"}>
                <Logo/>

                <div className="footerContact">
                    <a className="footerWeb" href="www.exadel.com">www.exadel.com</a>
                    <div className="footerLink">

                        <HtmlTooltip   title={"+380 2222 222"}   interactive>
                        <img onClick={copyNumber} src={phone} alt="icon"/>
                        </HtmlTooltip>

                        <HtmlTooltip title={"info@exadel.com"} interactive>
                            <img onClick={copyLink} src={email} alt="icon"/>
                        </HtmlTooltip>
                        {state &&
                        <span className={"copied"}>link copied</span>
                        }

                        <div className={"footerLink__social"}>
                            <a href="https://www.linkedin.com/company/exadel/" target="_blank">
                                <i className="icon-linkedin"></i>
                            </a>
                            <a href="https://www.facebook.com/exadelinc/" target="_blank">
                                <i className="icon-facebook"></i>
                            </a>
                        </div>
                        {/*<a id={"number"} href="tel:+3802222222">+380 2222 222</a>*/}
                    </div>

                    {/*<div className="footerLink">
                        <a id={"copy-email"} onClick={copyNumber}  title="copy"><img src={email} alt="icon"/></a>
                        <a id={"email"} href="mailto: info@exadel.com">info@exadel.com</a>
                        {state &&
                        <span className={"copied"}>link copied</span>
                        }

                    </div>*/}
                    {/*<div className={"footerLink__social"}>
                        <a href="https://www.linkedin.com/company/exadel/" target="_blank">
                            <i className="icon-linkedin"></i>
                        </a>
                        <a href="https://www.facebook.com/exadelinc/" target="_blank">
                            <i className="icon-facebook"></i>
                        </a>
                    </div>*/}
                </div>

                <div className="footerSocial">
                    <p>Copyright ©2021 “EXA COUPONS”. All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;