import React from 'react';
import { Submitbutton } from '../../index';
import { Input } from '../../index';
import "./AdminPanelVendor.scss";
// import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';

import NativeSelect from '@material-ui/core/NativeSelect';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
        width: '100%',
      backgroundColor: "#f7f9fb",
      border: '1px solid #000',
      padding: '9px',
      fontSize: '12px',
    color: 'B0B0B0',
    fontFamily: "Montserrat",
      
    },
  }),
)(InputBase);

const AdminPanelVendor = () => {
    const [country, setCountry] = React.useState('');
    const handleChangeCountry = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCountry(event.target.value as string);
    };

    const [city, setCity] = React.useState('');
    const handleChangeCity = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCity(event.target.value as string);
    };


    return (
        <div className="panelVendor">
            <Input title = "name"/>
            
            <NativeSelect
            id="demo-customized-select-native"
            value={country}
            onChange={handleChangeCountry}
            className = 'input'
            input={<BootstrapInput />}
            >
            <option aria-label="None" value="" />
            <option value={'Ukraine'}>Ukraine</option>
            <option value={'Poland'}>Poland</option>
            <option value={'Izrael'}>Izrael</option>
            </NativeSelect>

            <NativeSelect
            id="demo-customized-select-native"
            value={city}
            onChange={handleChangeCity}
            className = 'input'
            input={<BootstrapInput />}
            >
            <option aria-label="None" value="" />
            <option value={'Kyiv'}>Kyiv</option>
            <option value={'Lviv'}>Lviv</option>
            <option value={'Odessa'}>Odessa</option>
            </NativeSelect>

            <Input title = "address"/>

            <textarea className= 'panelVendorTextarea' placeholder="description"></textarea>

            <label>Upload Logo (PNG, JPG)
                <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png"></input>
            </label> 

            <Submitbutton/>
        </div>
    );
};

export default AdminPanelVendor;