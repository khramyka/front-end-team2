import { Button, Chip, ListItem, SnackbarOrigin } from '@material-ui/core';
import { Drawer, List } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import DropZone from '../../common/DropZone/DropZone';
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import "./AdminPanelVendor.scss";
import {
    getAllVendorLocation,
    getVendorAll,
    postVendor,
    postVendorLocation,
    uploadImage
} from "../../../http/filtersApi";
import { t } from 'ttag';
import { Alert } from '@material-ui/lab';
import { locale } from "../../common/LangSwitcher/i18nInit";
import SimpleSnackbar from '../../common/SimpleSnackbar/SimpleSnackbar';
import {addVendor, addVendorLocation} from "../../../store/filtersStore";
import {useAppDispatch} from "../../../store/Redux-toolkit-hook";

interface ChipData {
    key: number;
    country: string,
    city: string,
    address: string,
}


const AdminPanelVendor = () => {
    const dispatch = useAppDispatch();
    const [state, setState] = React.useState(false);
    const [uploadFileName, setUploadFileName] = React.useState<string | Blob>('');
    const [fileName, setFileName] = React.useState<string | Blob>('');
    const [location, setLocation] = React.useState<any[]>([])
    const [openSuccessSnackbar, setSuccessSnackbar] = React.useState(false);
    const [openErrorSnackbar, setErrorSnackbar] = React.useState(false);
    const emailReg: any = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const [data, setData] = React.useState({
        email: '',
        description: '',
        name: '',
    });
    const [newLocation, setNewLocation] = React.useState({
        newCountry: '',
        newCity: '',
        newAddress: '',
    });

    const setImage = (image: any) => {
        setFileName(image)
        setUploadFileName(image.name)
    }

    const clearForm = () => {
        setNewLocation({
            newCountry: '',
            newCity: '',
            newAddress: '',
        })
        setFileName('')
        setUploadFileName('')
        setData({
            email: '',
            description: '',
            name: '',
        })
        setLocation([])
    }

    const addLogoVendor = () => {
        const formData = new FormData();
        formData.append(
            "file",
            fileName,
        );
        return uploadImage(formData)
    }

    const checkValidation = () => {
        const emailCheck = new RegExp(emailReg).test(data.email)
        if (data.name !== '' &&
            data.email !== '' &&
            emailCheck &&
            data.description !== '' &&
            data.description.length <= 200 &&
            data.description.length >= 50 &&
            location.length !== 0 &&
            uploadFileName !== '' &&
            fileName !== '') {
            return true
        } else {
            return false
        }
    }

    const VendorAdd = async () => {
        if (checkValidation()) {
            const logo = await addLogoVendor()
            const logoURL = logo?.data.message
            const vendor = await postVendor({ name: data.name, description: data.description, email: data.email, image: logoURL })
            const vendorId = vendor.data.id
            location.forEach(l => postVendorLocation({
                country: l.country,
                city: l.city,
                addressLine: l.address,
                vendorId: vendorId
            }))
            clearForm()
            getAllVendorLocation().then(resolve =>dispatch(addVendorLocation(resolve.data)) ).catch(f=> console.log(f));
            getVendorAll().then(resolve=> dispatch(addVendor(resolve)));
            setSuccessSnackbar(true)
        } else {
            setErrorSnackbar(true)
        }

    }

    const toggleDrawer = (open: any) => (event: any) => {
        setState(open);
    }

    const submitAddress = () => {
        if (newLocation.newCountry !== '' && newLocation.newCity !== '' && newLocation.newAddress !== '') {
            setLocation([...location, { key: Math.random(), country: newLocation.newCountry, city: newLocation.newCity, address: newLocation.newAddress }])
            setNewLocation({
                newCountry: '',
                newCity: '',
                newAddress: '',
            })
        }
    }

    const handleKeyDownForName = (event: any): void => {
        if (locale === 'en') {
            if (event.keyCode === 65) {
                event.preventDefault();
                (event.shiftKey) ? (event.target.value = event.target.value + 'A') : (event.target.value = event.target.value + 'a');
                setData({ ...data, name: event.target.value })
                setTimeout(() => { event.target.focus() }, 0);
            }
        } else {
            return;
        }
    };

    const handleKeyDownForCountry = (event: any): void => {
        if (locale === 'en') {
            if (event.keyCode === 65) {
                event.preventDefault();
                (event.shiftKey) ? (event.target.value = event.target.value + 'A') : (event.target.value = event.target.value + 'a');
                setNewLocation({ ...newLocation, newCountry: event.target.value })
                setTimeout(() => { event.target.focus() }, 0);

            }
        } else {
            return;
        }
    };

    const handleKeyDownForCity = (event: any): void => {
        if (locale === 'en') {
            if (event.keyCode === 65) {
                event.preventDefault();
                (event.shiftKey) ? (event.target.value = event.target.value + 'A') : (event.target.value = event.target.value + 'a');
                setNewLocation({ ...newLocation, newCity: event.target.value })
                setTimeout(() => { event.target.focus() }, 0);

            }
        } else {
            return;
        }
    };

    const handleKeyDownForAddress = (event: any): void => {
        if (locale === 'en') {
            if (event.keyCode === 65) {
                event.preventDefault();
                (event.shiftKey) ? (event.target.value = event.target.value + 'A') : (event.target.value = event.target.value + 'a');
                setNewLocation({ ...newLocation, newAddress: event.target.value })
                setTimeout(() => { event.target.focus() }, 0);

            }
        } else {
            return;
        }
    };

    const handleKeyDownForEmail = (event: any): void => {
        if (locale === 'en') {
            if (event.keyCode === 65) {
                event.preventDefault();
                (event.shiftKey) ? (event.target.value = event.target.value + 'A') : (event.target.value = event.target.value + 'a');
                setData({ ...data, email: event.target.value })
                setTimeout(() => { event.target.focus() }, 0);

            }
        } else {
            return;
        }
    };

    const handleKeyDownForDescription = (event: any): void => {
        if (locale === 'en') {
            if (event.keyCode === 65) {
                event.preventDefault();
                (event.shiftKey) ? (event.target.value = event.target.value + 'A') : (event.target.value = event.target.value + 'a');
                setData({ ...data, description: event.target.value })
                setTimeout(() => { event.target.focus() }, 0);

            }
        } else {
            return;
        }
    };

    const useStyles = makeStyles({
        root: {
            "& .MuiDrawerPaper-root": {
                background: '#F7F9FB',
            },
            "& .MuiButton-root:hover": {
                backgroundColor: 'none'
            },
            ".MuiFormHelperText-contained": {
                margin: 0
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
        marginBottom: {
            marginBottom: 15
        },
        dropzone: {
            border: '1px solid #ced4da',
            fontSize: 14,
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
            width: '250px'
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
        modal_label: {
            textAlign: 'center'
        },
        address__span: {
            fontSize: 15,
            marginBottom: 20,
            cursor: 'pointer',
        },
        address_submit: {
            position: 'relative',
            left: 0,
            border: '2px solid #1877F2',
            color: '#1877F2',
            width: '130px'
        },
        address_cancel: {
            position: 'relative',
            left: 0,
            border: '2px solid #C4C4C4',
            width: '130px',
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
        displayN: {
            display: 'none'
        },
        helperTetxtSpan: {
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.54)'
        },
        '@media(max-width:700px)': {
            wrapper: {
                width: '320px'
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
            },
            uploadPhotoMobile: {
                display: 'flex',
                marginBottom: 20,
                fontSize: 15,
                'span': {
                    position: 'relative'
                }
            },
            uploadedFileName: {
                marginTop: '-74px',
            },
            dropzone: {
                width: 134,
                height: 40,
                border: 'none',
                outline: 'none',
                position: 'relative',
                top: '-61px',
                '&:hover': {
                    border: 'none'
                }
            },
            helperTetxtSpan: {
                fontSize: 10
            },
        }
    })

    const styles = useStyles();

    const handleDeleteChip = (chipToDelete: ChipData) => () => {
        setLocation((chips: any) => chips.filter((chip: any) => chip.key !== chipToDelete.key));
    };

    const list = () => (
        <List className={styles.wrapper}>
            <ListItem>
                <form className={styles.form}>
                    <Grid container direction='column'>
                        <div className={styles.wrapper__title} onClick={toggleDrawer(false)}>
                            <KeyboardBackspaceOutlinedIcon style={{ fontSize: 40, position: 'relative', top: 13 }} />
                            {t`Back`}
                        </div>
                        <span className={styles.modal_label}>{t`Add a vendor`}</span>
                        <TextField className={styles.marginBottom}
                            value={data.name}
                            required
                            label={t`Name`}
                            onKeyDown={handleKeyDownForName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, name: e.target.value })} />
                        {location.map((data: any) => {
                            if (data.city && data.country && data.address !== '') {
                                return (
                                    <li key={data.key}>
                                        <Chip
                                            label={data.country + ', ' + data.city + ', ' + data.address}
                                            variant='outlined'
                                            onDelete={handleDeleteChip(data)}
                                        />
                                    </li>
                                );
                            }

                        })}
                        <TextField className={styles.marginBottom}
                            label={t`Country`}
                            required
                            value={newLocation.newCountry}
                            onKeyDown={handleKeyDownForCountry}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setNewLocation({ ...newLocation, newCountry: e.target.value })
                            }}
                        />
                        <TextField className={styles.marginBottom}
                            label={t`City`}
                            required
                            value={newLocation.newCity}
                            onKeyDown={handleKeyDownForCity}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setNewLocation({ ...newLocation, newCity: e.target.value })
                            }}
                        />

                        <TextField className={styles.marginBottom}
                            label={t`Address`}
                            required
                            value={newLocation.newAddress}
                            onKeyDown={handleKeyDownForAddress}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setNewLocation({ ...newLocation, newAddress: e.target.value })
                            }}
                        />
                        <div className={styles.addressButtons}>
                            <Button onClick={submitAddress} className={styles.address_submit}>{t`Submit`}</Button>
                            <span className={styles.helperTetxtSpan}>Should be minimum 1 location: country, city and address</span>
                        </div>
                        <TextField className={styles.marginBottom}
                            value={data.email}
                            label={t`E-mail`}
                            helperText='Example: example@gmail.com'
                            onKeyDown={handleKeyDownForEmail}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, email: e.target.value })}
                            required
                        />
                        <TextField className={styles.marginBottom}
                            value={data.description}
                            required
                            multiline
                            rows={5}
                            label={t`Description`}
                            helperText='Min length 50, max length 200'
                            variant="outlined"
                            inputProps={{
                                maxLength: 200,
                                minLength: 50
                            }}
                            onKeyDown={handleKeyDownForDescription}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, description: e.target.value })} />
                        <div className={styles.uploadPhotoMobile}>
                            <button className={styles.uploadFile__btn}>{t`Upload photo`}</button>
                        </div>
                        <div className={styles.dropzone}>
                            <DropZone uploadPhoto={(image: any) => setImage(image)} />
                        </div>
                        <span className={styles.uploadedFileName}>{uploadFileName}</span>
                        <Button onClick={VendorAdd}
                            className={styles.submitButton}>{t`Submit`}
                        </Button>
                        <SimpleSnackbar
                            setSnackbar={setErrorSnackbar}
                            snackbarState={openErrorSnackbar}
                            label='Please, check all fields'
                            type='error' />
                        <SimpleSnackbar
                            setSnackbar={setSuccessSnackbar}
                            snackbarState={openSuccessSnackbar}
                            label='Vendor is successfully created'
                            type='success' />
                    </Grid>
                </form>
            </ListItem>
        </List>
    )
    return (
        <div>
            <button onClick={toggleDrawer(true)} className={styles.adminModalButton}>{t`Add a vendor`}</button>
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

export default AdminPanelVendor;