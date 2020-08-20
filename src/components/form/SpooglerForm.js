import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PartnerDataTextField from './PartnerDataTextField';
import PartnerGoogleAccountSelect from './PartnerGoogleAccountSelect';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      minWidth: 100,
    },
  },

  button: {
    backgroundColor: '#457b9d',
    color: '#ffffff',
    '&:hover': {
      background: '#1d3557',
    },
  },
}));

export default function SpooglerForm(props) {
  const classes = useStyles();

  const [partnerState, setPartnerState] = useState({
    name: '',
    email: '',
    isGoogler: false,
  });

  const [partnersMailTextField, setPartnersMailTextField] = useState(null);

  // function: String => Value => ()
  const changePartnerState = (property) => {
    return (newValue) => {
      partnerState[property] = newValue;
      setPartnerState(partnerState);
    };
  };

  // function: () => JSX
  const generatePartnersTextField = (data, dataLabel) => {
    return (
        <PartnerDataTextField
            propagateData={changePartnerState(data)}
            label={dataLabel}/>
    );
  };

  // function: Bool => ()
  const changeIsGoogler = (isGoogler) => {
    changePartnerState('isGoogler')(isGoogler);
    if (isGoogler) {
      setPartnersMailTextField(
          generatePartnersTextField('email', 'Your partner\'s @google address'),
      );
    } else {
      changePartnerState('email')('');
      setPartnersMailTextField(null);
    }
  };

  return (
      <Paper>
        <Grid container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.root}>
          <Grid item xs={10}>
            <PartnerGoogleAccountSelect
                propagateGooglerState={changeIsGoogler}/>
          </Grid>
          <Grid item xs={10}>
            {generatePartnersTextField('name', 'Your partner\'s full name')}
          </Grid>
          <Grid item xs={10}>
            {partnersMailTextField}
          </Grid>
          <Grid item xs={10}>
            <Button
                fullWidth
                margin="normal"
                onClick={() => {
                  props.propagateNewSpooglerForm(partnerState);
                }}
                variant="outlined"
                className={classes.button}>
              Submit!
            </Button>
          </Grid>
        </Grid>
      </Paper>
  );
}
