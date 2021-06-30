import React from 'react';
import "./Submitbutton.scss";
import Button from '@material-ui/core/Button';

const Submitbutton = ({name, heandekCklik, classN}:{name:string, heandekCklik:any, classN:string}) => {
    return (
        <Button variant="contained" color="primary" onClick={heandekCklik} className={classN}> 
        {name}
      </Button>
    );
};

export default Submitbutton;