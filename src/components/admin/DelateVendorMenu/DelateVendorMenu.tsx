import {ListItem} from '@material-ui/core';
import {Drawer, List} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import React, {useRef} from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import "./DelateVendorMenu.scss";
import AdminPanelVendor from '../AdminPanelVendor/AdminPanelVendor';
import {t} from 'ttag';
import {useAppSelector} from "../../../store/Redux-toolkit-hook";
import DelateVendorMenuEdit from "./DelateVendorMenuEdit";
import {getVendorAll} from "../../../http/filtersApi";
import {addVendor} from "../../../store/filtersStore";
import SimpleSnackbar from "../../common/SimpleSnackbar/SimpleSnackbar";
import ModalWithConfirm from "../../common/ModalWithConfirm/ModalWithConfirm";

const DelateVendorMenu = () => {
    const [state, setState] = React.useState(false);
    const {vendor} = useAppSelector(state => state.filters)
    const [snackBarSuccess, setSnackBarSuccess] = React.useState(false)
    const [snackBarSuccessLocation, setSnackBarSuccessLocation] = React.useState(false)
    const [snackBarError, setSnackBarError] = React.useState(false)
    const [snackBarSuccessDeleted, setSnackBarSuccessDeleted] = React.useState(false)
    const toggleDrawer = (open: any) => (event: any) => {
        setState(open);
    }

    const useStyles = makeStyles({
        root: {
            "& .MuiDrawerPaper-root": {
                background: '#F7F9FB',
            },
            "& .MuiButton-root:hover": {
                backgroundColor: 'none'
            }
        },
        wrapper: {
            height: '100%',
            width: 700,
            paddingRight: 25,
            paddingLeft: 25,
            fontFamily: 'Poppins',
            fontSize: 24,
        },
        wrapper__title: {
            margitTop: 50,
            marginBottom: 20,
            bottom: 20,
            cursor: 'pointer',
        },
        attention: {
            fontSize: 16,
            color: '#d32f2f',
            marginBottom: 10
        },
        attention__span: {
            position: 'relative',
            bottom: 9,
            left: 5,
            lineHeight: 1.5
        },
        vendorName: {
            fontSize: 16,
            border: 'none',
            borderBottom: '1px solid #D9D9D9',
            padding: '15px 15px 5px 10px',
        },
        vendor__icons: {
            posotion: 'absolute',
            float: 'right'
        },
        editingForm: {
            display: 'grid',
            width: '100%',
        },
        marginBottom: {
            marginBottom: 15
        },
        dropzone: {
            border: '1px solid #ced4da',
            fontSize: 14,
            paddingTop: 30,
            cursor: 'pointer',
            color: '#ced4da',
            borderRadius: 4,
            fontFamily: 'Poppins',
            textAlign: 'center',
            marginBottom: 20,
            '&:hover': {
                border: '1px solid black'
            }
        },
        submitButton: {
            position: 'relative',
            left: 0,
            border: '2px solid #1877F2',
            color: '#1877F2',
            width: '250px',
            marginTop: 10
        },
        adminModalButton: {
            fontSize: 16,
            color: '#1877F2',
            background: 'transparent',
            '&:hover': {
                background: 'none'
            }
        },
        uploadPhotoMobile: {
            display: 'none',
        },
        fileName: {
            width: 135,
            height: 38,
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
        },
        uploadFile__btn: {
            background: 'transparent',
            color: '#1877F2',
            padding: '10px 20px',
            border: '2px solid #1877F2'
        },
        uploadedFileName: {
            fontSize: 14,
            marginTop: '-14px',
            marginBottom: 20
        },
        adminPanel: {
            marginTop: 20,
            paddingTop: 3,
            paddingBottom: 7,
            width: 200,
            background: 'transparent',
            border: '2px solid #1877F2'
        },
        modal_label: {
            textAlign: 'center',
            marginBottom: 15,
        },
        address_submit: {
            position: 'relative',
            left: 0,
            border: '2px solid #1877F2',
            color: '#1877F2',
            width: '250px'
        },
        address_cancel: {
            position: 'relative',
            left: 0,
            border: '2px solid #C4C4C4',
            width: '250px',
        },
        addressButtons: {
            display: "flex",
            gridGap: 20,
            marginBottom: 15
        },
        marginBottom10: {
            marginBottom: 10,
            width: '100%'
        },
        form: {
            width: '700px'
        },
        uploadFile__span: {
            fontSize: '15px',
            marginBottom: '20px'
        },
        '@media(max-width:700px)': {
            wrapper: {
                width: '320px'
            },
            dropzone: {
                display: 'none'
            },
            uploadPhotoMobile: {
                display: 'flex',
                marginBottom: 20,
                fontSize: 15,
                'span': {
                    position: 'relative'
                }
            },
            modal_label: {
                fontSize: 18,
            },
            wrapper__title: {
                fontSize: 20
            },
            addressButtons: {
                gridGap: 10,
                flexDirection: 'column'
            },
            address_submit: {
                width: '100%'
            },
            address_cancel: {
                width: '100%'
            }
        }
    })

    const styles = useStyles();

    const list = () => (
        <List className={styles.wrapper}>
            <ListItem>
                <Grid container direction='column'>
                    <div className={styles.wrapper__title} onClick={toggleDrawer(false)}>
                        <KeyboardBackspaceOutlinedIcon style={{fontSize: 40, position: 'relative', top: 11}}/>
                        {t`Back`}
                    </div>
                    <span className={styles.modal_label}>{t`Vendors`}</span>
                    <div className={styles.attention}>
                        <ErrorOutlineIcon style={{color: '#d32f2f', fontSize: 30}}/>
                        <span
                            className={styles.attention__span}>{t`Removing a vendor will delete all its discounts`}</span>
                    </div>
                    {vendor.map((value: any) => <DelateVendorMenuEdit styles={styles} key={value.id}
                                                                      value={value} success={(success: boolean) => setSnackBarSuccess(success)}
                                                                      error={(success: boolean) => setSnackBarError(success)}
                                                                      locationUpdate={(success: boolean) => setSnackBarSuccessLocation(success)}
                                                                      deleted={(deleted: boolean) => setSnackBarSuccessDeleted(deleted)}
                    />)}
                    <button className={styles.adminPanel}>
                        <AdminPanelVendor/>
                    </button>
                </Grid>

                <SimpleSnackbar
                    setSnackbar={setSnackBarError}
                    snackbarState={snackBarError}
                    label='Something error, please try again'
                    type='error' />
                <SimpleSnackbar
                    setSnackbar={setSnackBarSuccess}
                    snackbarState={snackBarSuccess}
                    label='Vendor is successfully updated'
                    type='success' />
                <SimpleSnackbar
                    setSnackbar={setSnackBarSuccessLocation}
                    snackbarState={snackBarSuccessLocation}
                    label='Location is successfully updated'
                    type='success' />
                <SimpleSnackbar
                    setSnackbar={setSnackBarSuccessDeleted}
                    snackbarState={snackBarSuccessDeleted}
                    label='Vendor is successfully deleted'
                    type='success' />

            </ListItem>
        </List>
    )
    return (
        <div>
            <button onClick={toggleDrawer(true)} className={styles.adminModalButton}>{t`Vendors`}</button>
            <Drawer anchor={'right'}
                    open={state}
                    onClose={toggleDrawer(false)}>
                <div>
                    {list()}
                </div>
            </Drawer>
        </div>
    );
};

export default DelateVendorMenu;