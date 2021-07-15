import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { t } from 'ttag';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

let successDel = false;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'absolute',
        boxShadow: 'none',
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function SnackbarForDelPromo(props: any) {
    const classes = useStyles();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setSnackbar(false);
    };

    return (
        <div className={classes.root}>

            <Snackbar

                open={props.snackbarState} autoHideDuration={3000} onClose={handleClose}>
                { successDel ? (
                    <Alert onClose={handleClose} severity="success">
                        {t`Promo was successfully deleted!`}
                    </Alert>  )
                 : (<Alert onClose={handleClose} severity="error">
                        {t`Something went wrong...`}
                    </Alert>  )
                }

            </Snackbar>

        </div>
    );
}