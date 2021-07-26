import { Checkbox, Chip, ListItem, Snackbar, SnackbarOrigin } from '@material-ui/core';
import { Drawer, List } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef, useState, useEffect } from 'react';
import DropZone from '../../common/DropZone/DropZone';
import ContainerDataPiker from '../../common/SearchBar/ContainerDatePiker/ContainerDatePiker';
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import Button from '@material-ui/core/Button';
import "./AdminPanelCard.scss";
import { t } from 'ttag';
import AdminSelect from '../AdminSelect';
import { Alert } from '@material-ui/lab';
import { getVendorId, postCategory,   postVendorLocation, getSubCategoryAll, postSubCategory,deleteCategoryId, uploadImage, deleteSubCategoryId, getCategoryAll } from "../../../http/filtersApi"
import { postDiscount, putDiscount } from "../../../http/discountApi"
import { useAppSelector, useAppDispatch } from "../../../store/Redux-toolkit-hook";
import {getDiscounts} from "../../../http/discountApi"
import { firsLetterToUpperCase, timeString } from "../../../helpers/functionHelpers";
import { utimes } from 'fs';
import { captureRejectionSymbol } from 'stream';
import { addNewCategory, addNewSubCategory, addNewVendorLocation, addSubCategory, addDiscounds,delateCategory,delateSubCategory, addCategory,  } from "../../../store/filtersStore"
import { CancelPresentationOutlined, ContactsOutlined } from '@material-ui/icons';
import { saveLocale, locale } from '../../../components/common/LangSwitcher/i18nInit';
import SimpleSnackbar from '../../common/SimpleSnackbar/SimpleSnackbar';
interface State extends SnackbarOrigin {
  open: boolean;
}

interface ChipData {
  key: number;
  country: string,
  city: string,
  address: string,
}

interface Idiscount {
  name: any;
  vendorId: any;
  fullDescription: any;
  isOnline: boolean;
  imageLink: any;
  startDate: string;
  endDate: string;
  subCategoryIds: string[];
  locationIds: string[];
  categoryId: string;
  percentage?: number | undefined;
}


const AdminPanelCard = ({currentCard}) => {
  const getCurrentvendor = () =>{
    return (vendor.filter(item => item.id === currentCard.vendorId).map(item=>item.name))[0]
  }

  const getCurrentcategory = () =>{
    return (category.filter(item => item.id === currentCard.categoryId).map(item=>item.name))[0]
  }

  const getCurrentSubcategory = () =>{
    return currentCard.subCategories.map(item => item.name)
  }

  const getCurrentTime = () =>{
    return {
      From: new Date(currentCard.startDate * 1000),
      To : new Date(currentCard.endDate * 1000),
    }
  }


  
  const { category, vendorLocation, vendor, searchObject, subCategory, } = useAppSelector(state => state.filters);
  const [state, setState] = React.useState(false);
  const [disableInput, setDisableInput] = React.useState(false);
  // const [addressInput, setAddressInput] = React.useState(false);
  const [openErrorSnackbarServer, setErrorSnackbarServer] = React.useState(false);
  const [categoryInput, setCategoryInput] = React.useState(false);
  const [tagInput, setTagInput] = React.useState(false);
  const [uploadFileName, setUploadFileName] = React.useState<string>(currentCard ? currentCard.imageLink :'');
  const [currentImageLinck, delateCurrentImageLinck] = React.useState<string>(currentCard ? currentCard.imageLink: "");
  const [newCategory, setNewCategory] = React.useState('');
  const [newTag, setNewTag] = React.useState('');
  const [fileName, setFileName] = React.useState<string | Blob>('');
  const [choeseCategory, setChoeseCategory] = React.useState(currentCard ? getCurrentcategory() : "");
  const [choeseVendor, setChoeseVendor] = React.useState(currentCard ? getCurrentvendor() : "");
  const [choeseTag, setChoeseTag] = React.useState(currentCard ? getCurrentSubcategory() : []);
  const [title, setTitle] = React.useState<string>(currentCard ? currentCard.name : '');
  const [description, setDescription] = React.useState<string>(currentCard ? currentCard.fullDescription : '');
  const [discountValue, setDiscountValue] = React.useState(currentCard ? currentCard.percentage : '');
  const [isOnline, setIsOnline] = React.useState(currentCard ?currentCard.online : false);
  const [location, setLocation] = React.useState<any[]>([]);
  const [openSuccessSnackbar, setSuccessSnackbar] = React.useState(false);
  const [openErrorSnackbar, setErrorSnackbar] = React.useState(false);
  const [time, setTime] = useState(currentCard ? {To: new Date(currentCard.endDate * 1000) ,From: new Date(currentCard.startDate * 1000),} : {
    To: new Date(),
    From: new Date(),
  });
  const [tags, setTag] = React.useState(["a", "a", "a", "a",]);
  const [newLocation, setNewLocation] = React.useState({
    newCountry: '',
    newCity: '',
    newAddress: '',
  });
  const dispatch = useAppDispatch()


  const handleKeyDownForTitle = (event: any): void => {
    if (locale === 'en') {
      if (event.keyCode === 65) {
        event.preventDefault();
        (event.shiftKey) ? (event.target.value = event.target.value + 'A') : (event.target.value = event.target.value + 'a');
        setTitle(event.target.value);
        setTimeout(() => { event.target.focus() }, 0);
      }
    } else {
      return;
    }
  };

  const handleKeyDownForCategory = (event: any): void => {
    if (locale === 'en') {
      if (event.keyCode === 65) {
        event.preventDefault();
        (event.shiftKey) ? (event.target.value = event.target.value + 'A') : (event.target.value = event.target.value + 'a');
        setNewCategory(event.target.value);
        setTimeout(() => { event.target.focus() }, 0);
      }
    } else {
      return;
    }
  };

  const handleKeyDownForTag = (event: any): void => {
    if (locale === 'en') {
      if (event.keyCode === 65) {
        event.preventDefault();
        (event.shiftKey) ? (event.target.value = event.target.value + 'A') : (event.target.value = event.target.value + 'a');
        setNewTag(event.target.value);
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
        setDescription(event.target.value);
        setTimeout(() => { event.target.focus() }, 0);

      }
    } else {
      return;
    }
  };

  const categoryArr = category?.filter((item: any) => item.deleted === false).map(item => firsLetterToUpperCase(item.name));
  const addLogoDiscount = async() => {
    const formData = new FormData();
    formData.append(
      "file",
      fileName,
    );
    const {data} = await uploadImage(formData);
    delateCurrentImageLinck("");
    return data.message
  }

  const [categoryState, setcategoryState] = React.useState([...categoryArr]);
  const getVendorId = () => (vendor.filter(item => item.name === choeseVendor).map(item => item.id))[0];
  const getCategoryId = (arr) => {
    if(Array.isArray(arr)){
      const arrId = [];
      arr.forEach((item)=>{
        arrId.push(category.filter(i => i.name === item).map(item => item.id)); 
      })
      return arrId.flat();
    }
    return (category.filter(item => item.name === arr).map(item => item.id))[0]
  };

  
  useEffect(() => {
    setLocation([])
    const arrLocation: any[] = [];
    const choeseLocation = vendorLocation.filter(item => item.vendorId === getVendorId());
    choeseLocation?.forEach(item => {
      if (item.deleted) { return };
      arrLocation.push({ key: Math.random(), country: item.country, city: item.city, address: item.addressLine, id: item.id})
    })
    setLocation([...arrLocation])
  }, [choeseVendor]);

  useEffect(() => {
    choeseCategory && getSubCategoryAll(getCategoryId(choeseCategory)).then(resolve => dispatch(addSubCategory(resolve.data)));
  }, [choeseCategory])

  useEffect(() => {
    const subCategoryArr = subCategory?.filter((item: any) => item.deleted === false).map(item => firsLetterToUpperCase(item.name));
    setTag([...subCategoryArr])
  }, [subCategory])

  useEffect(() => {
    const categoryArr = category?.filter((item: any) => item.deleted === false).map(item => firsLetterToUpperCase(item.name));
    setcategoryState([...categoryArr])
  }, [category, category.length])

  const vendors = vendor?.map(item => firsLetterToUpperCase(item.name));

  const toggleDrawer = (open: any) => (event: any) => {
    setState(open);
  }

  let changeDisable = () => {
    setIsOnline(!isOnline)
    setDisableInput(!disableInput)
  }



  const addCategory = () => {
    setCategoryInput(true)
  }
  const submitCategory = async () => {
    setCategoryInput(false);
    if(!newCategory){
      return
    }
    const category  = firsLetterToUpperCase(newCategory)
    const { status, data } = await postCategory({ name: category})
    if (status >= 200 && status <= 299) {
      dispatch(addNewCategory(data))
    }
  }

  const cancelCategory = () => {
    setCategoryInput(false);
  }

  const addTag = () => {
    setTagInput(true)
  }

  const submitTag = async () => {
    setTagInput(false);
    if(!newTag){
      return
    }
    const tag = firsLetterToUpperCase(newTag)
    const { status, data } = await postSubCategory({ name:  tag}, getCategoryId(choeseCategory))
    if (status >= 200 && status <= 299) {
      dispatch(addNewSubCategory(data));
    }
  }

  const cancelTag = () => {
    setTagInput(false);
  }


  const setImage = (image: any) => {
    setFileName(image)
    setUploadFileName(image.name)
  }

  const useStyles = makeStyles({
    wrapper: {
      background: '#F7F9FB',
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
    checkbox__wrapper: {
      marginBottom: 30,
      position: 'relative',
    },
    checkbox: {
      width: 20,
      height: 20,
      marginRight: 5,
      top: 4,
      color: "#0082CA"
    },
    checkbox__label: {
      position: 'relative',
      fontSize: 16,
      bottom: 5
    },
    marginBottom: {
      marginBottom: 15,
      width: '100%'
    },
    marginBottom10: {
      marginBottom: 10,
      width: '100%'
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
    submitButton__disabled: {
      border: '2px solid rgba(0, 0, 0, 0.26)',
      width: '250px'
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
    modal_label: {
      textAlign: 'center'
    },
    adminModalButton: {
      fontSize: 16,
      color: '#1877F2',
      background: 'transparent',
      '&:hover': {
        background: 'none'
      }
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
    uploadFile__span: {
      fontSize: '15px',
      marginBottom: '20px'
    },
    form: {
      width: '700px'
    },
    uploadedFileName: {
      fontSize: 14,
      marginTop: '-14px',
      marginBottom: 20
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
        fontSize: 10,
        color: 'rgba(0, 0, 0, 0.54)'
      },
    },
  })

  const styles = useStyles();

  const handleDeleteChip = (chipToDelete: ChipData) => () => {
    setLocation((chips: any) => chips.filter((chip: any) => chip.key !== chipToDelete.key));
  };

  const [alertState, setAlertState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = alertState;

  const handleClickAlert = () => {
    setAlertState({ ...alertState, open: true });
  };

  const handleCloseAlert = () => {
    setAlertState({ ...alertState, open: false });
  };


  const getSubCatygoryId = (subCategory: any, choeseTag: any) => {
    const arrId = choeseTag.map((element: any) => {
      return subCategory.filter((item: any) => item.name.toLowerCase() === element.toLowerCase()).map((item: any) => item.id)
    });
    return arrId.flat();
  }


  const clearForm = () => {
    setTitle('')
    setDescription('')
    setFileName('')
    setUploadFileName('')
    setDiscountValue('')
    setLocation([])
    setIsOnline(false)
    setChoeseVendor('')
    // setChoeseTag(null)

  }

  const checkLocation = () => {
    if (location.length !== 0 || isOnline) {
      return true
    } else {
      return false
    }
  }

  const checkValidation = () => {
    if (title !== '' &&
      description.length <= 2000 &&
      description.length >= 50 &&
      checkLocation() &&
      uploadFileName !== '' &&
      choeseVendor !== '' &&
      choeseTag.length !== 0 &&
      discountValue !== ''&&
      time.To - time.From > 0) {
      return true
    } else {
      return false
    }
  }

  const createDiscount = async () => {
    if (checkValidation()) {
      const newDiscount: Idiscount = {
        name: title,
        fullDescription: description,
        imageLink: currentImageLinck || await addLogoDiscount(),
        categoryId: getCategoryId(choeseCategory),
        isOnline: isOnline,
        vendorId: getVendorId(),
        locationIds: location.map(item => item.id),
        endDate: timeString(time.To),
        startDate: timeString(time.From),
        subCategoryIds: getSubCatygoryId(subCategory, choeseTag),
        percentage: + discountValue,

      };
      const resolveFnc = (resolve) => {
        setSuccessSnackbar(true);
        clearForm();
        getDiscounts(searchObject).then(resolve=>dispatch(addDiscounds(resolve.data)))
      }
      if(currentCard){
        putDiscount(currentCard.id, newDiscount).then(resolve=>{
          resolveFnc(resolve)
      }).catch(e=> {
        console.log(e)
        setErrorSnackbarServer(true)
      })
      }else{
        postDiscount(newDiscount).then(resolve=>{
          resolveFnc(resolve)
      }).catch(e=> {
        setErrorSnackbarServer(true)
      })
      } 
    }
    else {
      setErrorSnackbar(true)
    }
  }
  
  const [categoryForeDelate, setCategoryForeDelate] = useState([]);
  const submitCategoryForeDelate = async () =>{
    setCategoryInput(false);
    if(!categoryForeDelate){
      return
    }
    const arrId =  getCategoryId(categoryForeDelate);
    arrId.forEach(async (id) => {
      const {status} = await deleteCategoryId(id);
       if(status <= 200 || status >= 299) {
         dispatch(delateCategory(id))
        }
        else{
          setErrorSnackbarServer(true);
        }
    })
    
  }

  const [subcategorySubForeDelate, setSubCategoryForeDelate] = useState([]);
  const submitsubCategoryForeDelate = async () =>{
    setTagInput(false);
    if(!subcategorySubForeDelate){
      return
    }
    const categoryId =  getCategoryId(choeseCategory);
    const subCategoryId  = getSubCatygoryId (subCategory, subcategorySubForeDelate);
    subCategoryId.forEach(async (id) => {
      const {status} = await deleteSubCategoryId(id, categoryId) ;
       if(status <= 200 || status >= 299) {
         dispatch(delateSubCategory(id))
        }
          else{
          setErrorSnackbarServer(true);
        }  
    })
  }

  const list = () => (
    <List className={styles.wrapper}>
      <ListItem>
        <form className={styles.form}>
          <Grid container direction='column'>
            <div className={styles.wrapper__title} onClick={toggleDrawer(false)}>
              <KeyboardBackspaceOutlinedIcon style={{ fontSize: 40, position: 'relative', top: 11 }} />
              {t`Back`}
            </div>
            <span className={styles.modal_label}>{currentCard ? t`Edit a discount`:  t`Add a promotion`}</span>
            <TextField
              required
              className={styles.marginBottom} label={t`Title`}
              onKeyDown={handleKeyDownForTitle}
              value={ title}
              onChange={(e: any) => {
                setTitle(e.target.value)
              }} />
            <AdminSelect
              name={t`Category`}
              data={categoryState}
              multi={false}
              value ={choeseCategory}
              handleChange={setChoeseCategory}
              />
            {categoryInput ?
              <>
                <TextField
                  required
                  className={styles.marginBottom}
                  label={t`Add new category`}
                  onKeyDown={handleKeyDownForCategory}
                  onChange={(e: any) => setNewCategory(e.target.value)} />
                <div className={styles.addressButtons}>
                  <Button onClick={submitCategory} className={styles.address_submit}>{t`Add new category`}</Button>
                  <Button onClick={cancelCategory} className={styles.address_cancel}>{t`Cancel`}</Button>
                </div>
                <AdminSelect
                  name={t`Delaete category`}
                  data={categoryState}
                  multi={true}
                  value ={categoryForeDelate}
                  handleChange={setCategoryForeDelate} />
                <div className={styles.addressButtons}>
                  <Button onClick={submitCategoryForeDelate} className={styles.address_submit}>{t`Delaete category`}</Button>
                  <Button onClick={cancelCategory} className={styles.address_cancel}>{t`Cancel`}</Button>
                </div>
              </>
              : <span className={styles.address__span} onClick={addCategory}>{t`+ Add or delaete category`}</span>}
            <AdminSelect
              name={t`Tags`}
              data={tags}
              disabled={currentCard? false : !choeseCategory}
              multi={true}
              valueArr = {choeseTag}
              handleChange={setChoeseTag}
              helpText='Please choose category' />
            {tagInput ?
              <>
                <TextField
                  required
                  className={styles.marginBottom}
                  disabled={!choeseCategory}
                  label={t`Add new tag`}
                  onKeyDown={handleKeyDownForTag}
                  onChange={(e: any) => setNewTag(e.target.value)} />
                <div className={styles.addressButtons}>
                  <Button onClick={submitTag} className={styles.address_submit}>{t`Add new tag`}</Button>
                  <Button onClick={cancelTag} className={styles.address_cancel}>{t`Cancel`}</Button>
                </div>
                <AdminSelect
                  name={t`Delate tags`}
                  data={tags}
                  multi={true}
                  valueArr = {subcategorySubForeDelate}
                  handleChange={setSubCategoryForeDelate}
                  helpText='Select wthat to delete' />
                  <div className={styles.addressButtons}>
                  <Button onClick={submitsubCategoryForeDelate} className={styles.address_submit}>{t`Delate tags`}</Button>
                  <Button onClick={cancelTag} className={styles.address_cancel}>{t`Cancel`}</Button>
                </div>
              </>
              : <span className={styles.address__span} onClick={addTag}>{t`+ Add or delete tag`}</span>}
            <AdminSelect name={t`Vendor Name`} disabled={currentCard? true : false} value={choeseVendor} data={vendors} multi={false} handleChange={setChoeseVendor} />
            {disableInput ? '' : (
              <>
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
                
                  <span className={styles.helperTetxtSpan}>
                    Should be minimum 1 location: country, city and address. <br />
                    If location is online - please choose 'Online'
                  </span>
                
              </>
            )}
            <div className={styles.checkbox__wrapper}>
              <input type="checkbox" value={isOnline} className={styles.checkbox} onClick={changeDisable} />
              <label className={styles.checkbox__label} >{t`Online`}</label>
            </div>
            <div className={styles.marginBottom}>
              <ContainerDataPiker setTime={setTime} time={currentCard ? getCurrentTime() : false}/>
            </div>
            <TextField
              className={styles.marginBottom}
              required
              label={t`Discount %`}
              value={discountValue}
              type='number'
              onChange={(e: any) => setDiscountValue(e.target.value)}
              InputProps={{ inputProps: { min: 0 } }} />
            <TextField
              className={styles.marginBottom}
              required
              multiline rows={5}
              label={t`Description`}
              onKeyDown={handleKeyDownForDescription}
              onChange={(e: any) => setDescription(e.target.value)}
              helperText='Min length 50, max length 2000'
              variant="outlined"
              value={description}
              inputProps={{
                maxLength: 2000,
                minLength: 50
              }} />
            <div className={styles.uploadPhotoMobile}>
              <button className={styles.uploadFile__btn}>Upload photo</button>
            </div>
            <div className={styles.dropzone}>
              <DropZone uploadPhoto={(image: any) => setImage(image)} />
            </div>
            <span className={styles.uploadedFileName}>{uploadFileName}</span>
            <Button className={styles.submitButton} onClick={createDiscount}>{t`Submit`}</Button>
            <SimpleSnackbar
              setSnackbar={setErrorSnackbar}
              snackbarState={openErrorSnackbar}
              label='Please, check all fields'
              type='error' />
            <SimpleSnackbar
              setSnackbar={setSuccessSnackbar}
              snackbarState={openSuccessSnackbar}
              label='Discount is successfully created'
              type='success' />
              <SimpleSnackbar
              setSnackbar={setErrorSnackbarServer}
              snackbarState={openErrorSnackbarServer}
              label='the server cannot handle your request right now'
              type='error' />
          </Grid>
        </form>
      </ListItem>
    </List>
  )
  return (
    <div>
      {currentCard ? <button onClick={toggleDrawer(true)} className={styles.adminModalButton}>
        <EditIcon style={{ fontSize: 25, marginRight: 5, color: 'black' }} />
      </button> :
      <button onClick={toggleDrawer(true)} className={styles.adminModalButton}>{t`Add a promotion`}</button>
      }
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

export default AdminPanelCard;