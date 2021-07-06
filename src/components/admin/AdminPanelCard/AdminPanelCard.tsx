import { ListItem } from '@material-ui/core';
import { Drawer, List } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import DropZone from '../../common/DropZone/DropZone';
import ContainerDataPiker from '../../common/SearchBar/ContainerDatePiker/ContainerDatePiker';
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./AdminPanelCard.scss";
import { AutocompleteRenderOptionState } from '@material-ui/lab';
import AutocompleteMultipleChoise from '../../common/AutocompleteMultipleChoise/AutocompleteMultipleChoise';
import { useForm } from 'react-hook-form';

const AdminPanelCard = () => {
  const [state, setState] = React.useState(false);
  const [disableInput, setDisableInput] = React.useState(false);
  const [addressInput, setAddressInput] = React.useState(false);
  const [categoryInput, setCategoryInput] = React.useState(false);
  const [tagInput, setTagInput] = React.useState(false);
  const [uploadFileName, setUploadFileName] = React.useState();
  const [newAddress, setNewAddress] = React.useState('');
  const [newCategory, setNewCategory] = React.useState('');
  const [newTag, setNewTag] = React.useState('');
  const [image, setImage] = React.useState();
  const parentRef = useRef<any>();

  const [address, setAddress] = React.useState([
    { title: 'Chornovola Str, 27' },
    { title: 'Yakuba Kolasa Str, 37' },
    { title: 'Horodotska Str, 7a' },
    { title: 'Rynok Sqr, 1' },
    { title: 'Mazepy Str, 1a' },
    { title: 'Warshavska Str, 127' },
  ]);

  const [categories, setCategory] = React.useState([
    { title: 'Category 1' },
    { title: 'Category 2' },
    { title: 'Category 3' },
    { title: 'Category 4' },
  ]);


  const [tags, setTag] = React.useState([
    { title: 'Tag 1' },
    { title: 'Tag 2' },
    { title: 'Tag 3' },
    { title: 'Tag 4' },
  ]);

  const vendors = [
    { title: 'Nike' },
    { title: 'Puma' },
    { title: 'Dominos' },
    { title: 'Zara' },
  ];

  const country = [
    { title: 'Country 1' },
    { title: 'Country 2' },
    { title: 'Country 3' },
    { title: 'Country 4' },

  ];

  const city = [
    { title: 'City 1' },
    { title: 'City 2' },
    { title: 'City 3' },
    { title: 'City 4' },
    { title: 'City 5' },

  ];

  const toggleDrawer = (open: any) => (event: any) => {
    setState(open);
  }

  let changeDisable = () => {
    setDisableInput(!disableInput)
  }

  const addAddress = () => {
    setAddressInput(true)
  }

  const submitAddress = () => {
    setAddressInput(false);
    let addNewAddress = address.concat({ title: newAddress });
    setAddress(addNewAddress)
  }

  const cancelAddress = () => {
    setAddressInput(false);
  }

  const addCategory = () => {
    setCategoryInput(true)
  }
  const submitCategory = () => {
    setCategoryInput(false);
    let addNewCategory = categories.concat({ title: newCategory });
    setCategory(addNewCategory)
  }

  const cancelCategory = () => {
    setCategoryInput(false);
  }

  const addTag = () => {
    setTagInput(true)
  }
  const submitTag = () => {
    setTagInput(false);
    let addNewTag = tags.concat({ title: newTag });
    setTag(addNewTag)
  }

  const cancelTag = () => {
    setTagInput(false);
  }

  const useStyles = makeStyles({
    root: {
      "& .MuiButton:hover": {
        backgroundColor: 'red'
      },
      "& .MuiListItem-root": {
        flexDirection: 'column',
        alignItems: 'normal',
        justifyContent: 'normal'
      },
    },
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
    },
    checkbox__label: {
      marginTop: 2,
      position: 'absolute',
      fontSize: 16,
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
    uploadedFileName: {
      fontSize: 14,
      marginTop: '-14px',
      marginBottom: 20
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
    '@media(max-width:700px)': {
      wrapper: {
        width: '320px'
      },
      dropzone: {
        zIndex: 25,
        opacity: 0,
        height: 40,
        width: 131,
        borderRadius: '0px',
        position: 'relative',
        border: 'none',
        outline: 'none',
        marginBottom: '-18px'
      },
      uploadPhotoMobile: {
        display: 'flex',
        fontSize: 15,
        position: 'relative',
        bottom: '20px',
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
    },
  })

  const styles = useStyles();


  const [validation, setVal] = React.useState<string>();
  const [errors, setErrors] = React.useState<{ validation: string }>();

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = e;
    setErrors({ validation: '' })
    setVal(value);
    let reg = /^[a-zA-Z]+$/.test(value);
    if (!reg) {
      setErrors({ validation: 'Error' })
    }
  }

  const [validationDiscount, setValDiscount] = React.useState<string>();
  const [errorsDiscount, setErrorsDiscount] = React.useState<{ discount: string }>();

  const handleChangeDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = e;
    setErrorsDiscount({ discount: '' })
    setValDiscount(value);
    let reg = /[0-9]/.test(value);
    if (!reg) {
      setErrorsDiscount({ discount: 'Error' })
    }
  }

  const [valiData, setValiData] = React.useState<string[]>([]);
  const [valiDataVendor, setValiDataVendor] = React.useState<string[]>([]);
  const list = () => (
    <List className={styles.wrapper}>
      <ListItem>
        <form onSubmit={toggleDrawer(false)}>
          <Grid container direction='column'>
            <div className={styles.wrapper__title} onClick={toggleDrawer(false)}>
              <KeyboardBackspaceOutlinedIcon style={{ fontSize: 40, position: 'relative', top: 11 }} />
              Back
            </div>
            <span className={styles.modal_label}>Add a promotion</span>
            <TextField className={styles.marginBottom}
              label="Title"
              value={validation}
              required
            />
            <Autocomplete
              className={styles.marginBottom10}
              options={categories}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} label="Category" required />}
            />
            {categoryInput ?
              <>
                <TextField className={styles.marginBottom} label="Add new category" onChange={(e: any) => setNewCategory(e.target.value)} />
                <div className={styles.addressButtons}>
                  <Button onClick={submitCategory} className={styles.address_submit}>Submit</Button>
                  <Button onClick={cancelCategory} className={styles.address_cancel}>Cancel</Button>
                </div>
              </>
              : <span className={styles.address__span} onClick={addCategory}>+ Add new category</span>}
            <Autocomplete
              className={styles.marginBottom10}
              options={tags}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} label="Tag" required />}
            />
            {tagInput ?
              <>
                <TextField className={styles.marginBottom} label="Add new tag" onChange={(e: any) => setNewTag(e.target.value)} />
                <div className={styles.addressButtons}>
                  <Button onClick={submitTag} className={styles.address_submit}>Submit</Button>
                  <Button onClick={cancelTag} className={styles.address_cancel}>Cancel</Button>
                </div>
              </>
              : <span className={styles.address__span} onClick={addTag}>+ Add new tag</span>}
            <Autocomplete
              className={styles.marginBottom10}
              options={vendors}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} label="Vendor name" required />}
            />
            {disableInput ? '' : (
              <>
                <AutocompleteMultipleChoise data={country} lab='Country' clName={styles.marginBottom10} />
                <AutocompleteMultipleChoise data={city} lab='City' clName={styles.marginBottom10} />
                <AutocompleteMultipleChoise data={address} lab='Address' clName={styles.marginBottom10} />
                {addressInput ?
                  <>
                    <TextField className={styles.marginBottom} label="Add an address" onChange={(e: any) => setNewAddress(e.target.value)} />
                    <div className={styles.addressButtons}>
                      <Button onClick={submitAddress} className={styles.address_submit}>Submit</Button>
                      <Button onClick={cancelAddress} className={styles.address_cancel}>Cancel</Button>
                    </div>
                  </>
                  : <span className={styles.address__span} onClick={addAddress}>+ Add new address</span>}
              </>
            )}
            <div className={styles.checkbox__wrapper}>
              <input type="checkbox" className={styles.checkbox} onClick={changeDisable} />
              <label className={styles.checkbox__label} >Online</label>
            </div>
            <div className={styles.marginBottom}>
              <ContainerDataPiker />
            </div>
            <TextField className={styles.marginBottom} label="Discount %"
              value={validationDiscount}
              onChange={handleChangeDiscount}
              error={Boolean(errorsDiscount?.discount)}
              required />
            <TextField className={styles.marginBottom}
              required
              multiline rows={5}
              label="Description"
              variant="outlined" />
            <div className={styles.dropzone}>
              <DropZone uploadPhoto={(image: any) => setUploadFileName(image)} />
            </div>
            <div className={styles.uploadPhotoMobile}>
              <button type='button' className={styles.uploadFile__btn}>Upload photo</button>
            </div>
            <span className={styles.uploadFile__span}>{uploadFileName}</span>
            <Button type='submit' className={styles.submitButton}>Submit</Button>
          </Grid>
        </form>
      </ListItem>
    </List>
  )
  return (
    <div>
      <button onClick={toggleDrawer(true)} className={styles.adminModalButton}>Add a promotion</button>
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