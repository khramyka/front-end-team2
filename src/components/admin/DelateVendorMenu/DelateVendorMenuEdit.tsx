import {Button, Chip, SnackbarOrigin} from '@material-ui/core';
import {TextField} from '@material-ui/core';
import React, {useEffect, useRef} from 'react';
import DropZone from '../../common/DropZone/DropZone';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import "./DelateVendorMenu.scss";
import {t} from 'ttag';
import {
    deleteVendorId,
    deleteVendorLocationId, getAllVendorLocation, getVendorAll,
    getVendorLocation,
    postVendorLocation, restVendorId,
    uploadImage
} from "../../../http/filtersApi";
import {addVendor, addVendorLocation} from "../../../store/filtersStore";
import {useAppDispatch} from "../../../store/Redux-toolkit-hook";
import {locale} from "../../common/LangSwitcher/i18nInit";
import SimpleSnackbar from "../../common/SimpleSnackbar/SimpleSnackbar";
import ModalWithConfirm from "../../common/ModalWithConfirm/ModalWithConfirm";



const DelateVendorMenuEdit = ({styles, value, success, error, locationUpdate, deleted}) => {
    interface ChipData {
        key: number;
        country: string,
        city: string,
        address: string,
    }
    interface State extends SnackbarOrigin {
        open: boolean;
    }
    const dispatch = useAppDispatch();
    const [edit, setEdit] = React.useState(false)
    const [state, setState] = React.useState(false);
    const [uploadFileName, setUploadFileName] = React.useState<string>(value.image);
    const [fileName, setFileName] = React.useState<string | Blob>('');
    const [snackBarSuccess, setSnackBarSuccess] = React.useState(false)
    const [snackBarError, setSnackBarError] = React.useState(false)
    const [openModal, setOpenModal] = React.useState(false)
    const [data, setData] = React.useState({
        email: value.email,
        description: value.description,
        name: value.name,
    });
    const [location, setLocation] = React.useState<any[]>([])
    const [newLocation, setNewLocation] = React.useState({
        newCountry: '',
        newCity: '',
        newAddress: '',
    });

    const toggleDrawer = (open: any) => (event: any) => {
        setState(open);
    }
    const editVendor = () => {
        !edit && getVendorLocation(value.id).then(v => setLocation(v.data.content))
        console.log(location)
        setEdit(!edit)


        // console.log(data.description)
        // console.log(data.name)
        // console.log(data.email)
        // console.log(uploadFileName)
        // console.log(fileName)
    }

    const deleteVendor = async () => {
        try{
            await deleteVendorId(value.id).then(v => getVendorAll().then(resolve=> {dispatch(addVendor(resolve));console.log(resolve)}))
            deleted(true)
            setEdit(false)
        }
        catch (e){
            error(true)
        }

    }

    const handleDeleteChip = (chipToDelete: ChipData) => () => {
        if(chipToDelete.key){
        setLocation((chips: any) => chips.filter((chip: any) => chip.key !== chipToDelete.key))
        } else {
            deleteVendorLocationId(chipToDelete?.id, chipToDelete?.vendorId).then(v => locationUpdate(true))
            setLocation((chips: any) => chips.filter((chip: any) => chip.id !== chipToDelete.id))
        }
    };
    const addLogoVendor = () => {
        const formData = new FormData();
        formData.append(
            "file",
            fileName,
        );
        return uploadImage(formData)
    }

    const submitEditVendor = async () => {
        if(fileName !== ''){
            try {
                const logo = await addLogoVendor()
                const logoURL = logo?.data.message
                const vendor = await restVendorId(value.id ,{ name: data.name, description: data.description, email: data.email, image: logoURL })
                getVendorAll().then(resolve=> {dispatch(addVendor(resolve));console.log(resolve)})
                success(true)
                setEdit(false)
            }
            catch (e){
                error(true)
                setData({
                    email: value.email,
                    description: value.description,
                    name: value.name,
                })
            }
        } else {
            try {
                const vendor = await restVendorId(value.id ,{ name: data.name, description: data.description, email: data.email, image: uploadFileName })
                getVendorAll().then(resolve=> {dispatch(addVendor(resolve));console.log(resolve)})
                success(true)
                setEdit(false)
            }
            catch (e){
                error(true)
                setData({
                    email: value.email,
                    description: value.description,
                    name: value.name,
                })
            }
        }

    }

    const cancelEdit = () => {
        setData({
            email: value.email,
            description: value.description,
            name: value.name,
        })
        setEdit(false)

    }

    /// test console.log

    const setImage = (image: any) => {
        setFileName(image)
        setUploadFileName(image.name)
    }


    const submitAddress = async () => {
        if (newLocation.newCountry !== '' && newLocation.newCity !== '' && newLocation.newAddress !== '') {
            setNewLocation({
                newCountry: '',
                newCity: '',
                newAddress: '',
            })
            try{
               await postVendorLocation({country: newLocation.newCountry, city: newLocation.newCity, addressLine: newLocation.newAddress , vendorId: value.id}).then(v => setLocation([...location, v.data]))
                locationUpdate(true)
                getAllVendorLocation().then(resolve =>dispatch(addVendorLocation(resolve.data)) ).catch(f=> console.log(f));
            }
            catch (e) {
                error(true)
            }

        }
    }


    const handleKeyDownForName = (event: any): void => {
        if (locale === 'en') {
            if (event.keyCode === 65) {
                event.preventDefault();
                (event.shiftKey) ? (event.target.value = event.target.value + 'A') : (event.target.value = event.target.value + 'a');
                setData({ ...data, name: event.target.value })
                setTimeout(() => {event.target.focus()}, 0);

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
                setNewLocation({...newLocation, newCountry: event.target.value})
                setTimeout(() => {event.target.focus()}, 0);

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
                setNewLocation({...newLocation, newCity: event.target.value})
                setTimeout(() => {event.target.focus()}, 0);

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
                setNewLocation({...newLocation, newAddress: event.target.value})
                setTimeout(() => {event.target.focus()}, 0);

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
                setTimeout(() => {event.target.focus()}, 0);

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
                setTimeout(() => {event.target.focus()}, 0);

            }
        } else {
            return;
        }
    };


    return <div className={styles.vendorName}>
        {value.name}
        <section className={styles.vendor__icons}>
            <EditIcon onClick={() => {
                editVendor()
            }}
                      style={{fontSize: 22, marginRight: 5, position: 'relative', bottom: 4, cursor: "pointer"}}/>
            <DeleteOutlineIcon onClick={() => {setOpenModal(true)}}
                               style={{
                                   color: '#d32f2f',
                                   fontSize: 22,
                                   position: 'relative',
                                   bottom: 4,
                                   cursor: "pointer"
                               }}/>
        </section>
        {edit ? (
            <form onSubmit={toggleDrawer(false)}>
                <div className={styles.editingForm}>
                    <TextField className={styles.marginBottom} required defaultValue={data.name}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, name: e.target.value })}
                               onKeyDown={handleKeyDownForName}
                               label={t`Name`}/>

                    {location.map((data: any) => {
                        if (data.city && data.country && data.address !== '') {
                            return (
                                <li key={data.id}>
                                    <Chip
                                        label={data.country + ', ' + data.city + ', ' + data.addressLine}
                                        variant='outlined'
                                        onDelete={handleDeleteChip(data)}
                                    />
                                </li>
                            );
                        }

                    })}
                    <TextField className={styles.marginBottom}
                               label={t`Country`}
                               value={newLocation.newCountry}
                               onKeyDown={handleKeyDownForCountry}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                   setNewLocation({...newLocation, newCountry: e.target.value})
                               }}
                    />
                    <TextField className={styles.marginBottom}
                               label={t`City`}
                               value={newLocation.newCity}
                               onKeyDown={handleKeyDownForCity}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                   setNewLocation({...newLocation, newCity: e.target.value})
                               }}
                    />

                    <TextField className={styles.marginBottom}
                               label={t`Address`}
                               value={newLocation.newAddress}
                               onKeyDown={handleKeyDownForAddress}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                   setNewLocation({...newLocation, newAddress: e.target.value})
                               }}
                    />
                    <div className={styles.addressButtons}>
                        <Button onClick={submitAddress}
                                className={styles.address_submit}>{t`Submit`}</Button>
                    </div>
                    <TextField className={styles.marginBottom} required defaultValue={data.email}
                               label={t`E-mail`}
                               onKeyDown={handleKeyDownForEmail}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, email: e.target.value })}
                    />
                    <TextField className={styles.marginBottom}
                               required
                               multiline
                               rows={5}
                               label={t`Description`}
                               variant="outlined"
                               defaultValue={data.description}
                               onKeyDown={handleKeyDownForDescription}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, description: e.target.value })}
                    />
                    <div className={styles.dropzone}>
                        <DropZone uploadPhoto={(image: any) => setImage(image)} />
                    </div>
                    <div className={styles.uploadPhotoMobile}>
                        <button type='button' className={styles.uploadFile__btn}>Upload photo
                        </button>
                    </div>
                        <span className={styles.uploadFile__span}>{uploadFileName}</span>
                    <div className={styles.addressButtons}>
                        <Button onClick={() => {
                            submitEditVendor()
                        }} className={styles.address_submit}>{t`Submit`}</Button>
                        <Button onClick={() => {
                            cancelEdit()
                        }} className={styles.address_cancel}>{t`Cancel`}</Button>
                    </div>

                </div>
            </form>
        ) : ''}
        <ModalWithConfirm
            setModalState={setOpenModal}
            modalState={openModal}
            title={t`Are you sure?`}
            description={t`Deleted vendor will deleted all him promo!`}
            action={deleteVendor}
        />
    </div>
}
    export default DelateVendorMenuEdit;