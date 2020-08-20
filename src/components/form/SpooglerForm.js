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
  input: {
    margin: 8,
    backgroundColor: '#457b9d',
    color: '#a8dadc',
  }
}));

export default function Form(props) {
  const classes = useStyles();

  const [partnerState, setPartnerState] = useState({
    name: '',
    email: '',
    isGoogler: false,
  });

  const [partnersMailTextField, setPartnersMailTextField] = useState(null);

  const changePartnerState = (property) => {
    return (newValue) => {
      const partnerStateCopy = partnerState;
      partnerStateCopy[property] = newValue;
      setPartnerState(partnerStateCopy);
    };
  };

  const changeIsGoogler = (state) => {
    changePartnerState('isGoogler')(state);
    if (partnerState['isGoogler']) {
      setPartnersMailTextField(
          <Grid item xs={10}>
            <PartnerDataTextField
                propagateData={
                  changePartnerState('email')
                }
                label="Your partner's @google address"/>
          </Grid>,
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
            <PartnerDataTextField
                propagateData={changePartnerState('name')}
                label="Your partner's full name"/>
          </Grid>
          {partnersMailTextField}
          <Grid item xs={10}>
            <Button
                fullWidth
                margin="normal"
                onClick={() => {
                  props.propagateNewSpooglerForm(partnerState);
                }}
                variant="outlined"
                className={classes.input}>
              Submit!
            </Button>
          </Grid>
        </Grid>
      </Paper>
  );
}