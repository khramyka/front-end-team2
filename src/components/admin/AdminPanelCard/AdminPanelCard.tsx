import { ListItem } from '@material-ui/core';
import { Drawer, List } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import DropZone from '../../common/DropZone/DropZone';
import ContainerDataPiker from '../../common/SearchBar/ContainerDatePiker/ContainerDatePiker';
import SelectMultiple from '../../common/SearchBar/SelectMultiple/SelectMultiple';
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./AdminPanelCard.scss";
import { AutocompleteRenderOptionState } from '@material-ui/lab';

const AdminPanelCard = () => {
  const [state, setState] = React.useState(false);
  const [countryValue, setCountryValue] = React.useState('');
  const [cityValue, setCityValue] = React.useState('');
  const [disableInput, setDisableInput] = React.useState(false);
  const [addressInput, setAddressInput] = React.useState(false);
  const [uploadFileName, setUploadFileName] = React.useState('');
  const [newAddress, setNewAddress] = React.useState('');
  const parentRef = useRef<any>();
  const tags = ["sport", "food", "clothes", "games"];
  const [address, setAddress] = React.useState([
    { title: 'Chornovola Str, 27' },
    { title: 'Yakuba Kolasa Str, 37' },
    { title: 'Horodotska Str, 7a' },
    { title: 'Rynok Sqr, 1' },
    { title: 'Mazepy Str, 1a' },
    { title: 'Warshavska Str, 127' },
  ])

  const toggleDrawer = (open: any) => (event: any) => {
    setState(open);
  }

  const handleChangeCountry = (event: any) => {
    setCountryValue(event.target.value)
  }

  const handleChangeCity = (event: any) => {
    setCityValue(event.target.value)
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
    },
    checkbox__label: {
      marginTop: 2,
      position: 'absolute',
      fontSize: 16,
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
      height: 40,
      width: 200,
      background: 'linear-gradient(to right, #1877F2, #1815BE)',
      color: 'white',
      fontSize: 15,
      transition: 'background 0.3s linea',
      '&:hover': {
        background: 'linear-gradient(to right, #194ddb, #0d0b69)',
      }
    },
    tags: {
      marginBottom: 12
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
      marginBottom: 25,
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
    },
  })

  const styles = useStyles();

  const list = () => (
    <List className={styles.wrapper}>
      <ListItem>
        <Grid container direction='column'>
          <div className={styles.wrapper__title} onClick={toggleDrawer(false)}>
            <KeyboardBackspaceOutlinedIcon style={{ fontSize: 40, position: 'relative', top: 11 }} />
            Back
          </div>
          <span className={styles.modal_label}>Add a promotion</span>
          <TextField className={styles.marginBottom} label="Title" />
          <SelectMultiple data={tags} clName={styles.tags} name={"Tags"} />
          <TextField className={styles.marginBottom} label="Vendor Name" />
          {disableInput ? '' : (
            <>
              <FormControl>
                <InputLabel>Country</InputLabel>
                <Select value={countryValue}
                  onChange={handleChangeCountry}
                  className={styles.marginBottom}>
                  <MenuItem value={'Ukraine'}>Ukraine</MenuItem>
                  <MenuItem value={'Belarus'}>Belarus</MenuItem>
                  <MenuItem value={'USA'}>USA</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>City</InputLabel>
                <Select value={cityValue}
                  onChange={handleChangeCity}
                  className={styles.marginBottom}>
                  <MenuItem value={'Lviv'}>Lviv</MenuItem>
                  <MenuItem value={'Kyiv'}>Kyiv</MenuItem>
                  <MenuItem value={'Kharkiv'}>Kharkiv</MenuItem>
                </Select>
              </FormControl>
              <Autocomplete
                multiple
                options={address}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(option: { title: string }, state: AutocompleteRenderOptionState) => (
                  <li {...state}>
                    {option.title}
                  </li>
                )}
                style={{ width: '100%', marginBottom: 15 }}
                renderInput={(params) => (
                  <TextField {...params} label="Address" />
                )}
              />
              {addressInput ?
                <>
                  <TextField className={styles.marginBottom} label="Add an address" onChange={(e: any) => setNewAddress(e.target.value)} />
                  <div className={styles.addressButtons}>
                    <Button onClick={submitAddress} className={styles.address_submit}>Submit</Button>
                    <Button onClick={cancelAddress} className={styles.address_cancel}>Cancel</Button>
                  </div>
                </>
                : <span className={styles.address__span} onClick={addAddress}>+ Add an address</span>}
            </>
          )}
          <div className={styles.checkbox__wrapper}>
            <input type="checkbox" className={styles.checkbox} onClick={changeDisable} />
            <label className={styles.checkbox__label} >Online</label>
          </div>
          <div className={styles.marginBottom}>
            <ContainerDataPiker />
          </div>
          <TextField className={styles.marginBottom} label="Discount %" />
          <TextField className={styles.marginBottom} multiline rows={5} label="Description" variant="outlined" />
          <div className={styles.dropzone}>
            <DropZone wrapperHeight={100} />
          </div>
          <div className={styles.uploadPhotoMobile}>
            <input type="file"
              ref={parentRef}
              className={styles.fileName}
              id='fileName'
              accept=".png, .jpg, .jpeg"
              onChange={(e) => { setUploadFileName(parentRef.current.files[0].name) }} />
            <button className={styles.uploadFile__btn}>Upload photo</button>
          </div>
          <span className={styles.uploadedFileName}>{uploadFileName}</span>
          <button className={styles.submitButton} onClick={toggleDrawer(false)}>Submit</button>
        </Grid>
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