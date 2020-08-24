import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PartnerDataTextField from './InviteeDataTextField';
import InviterSelect from './InviterSelect';

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

export default function InviteeForm(props) {
  const classes = useStyles();

  const [partnerState, setPartnerState] = useState({
    name: '',
    email: '',
    isGoogler: false,
  });

  // function: String => (Value => ())
  const changePartnerState = (key) => {
    return (newValue) => {
      setPartnerState({...partnerState, [key]: newValue});
    };
  };

  // function: (String, String) => JSX
  const generatePartnersTextField = (dataType, dataLabel) => {
    return (
        <PartnerDataTextField
            propagateData={changePartnerState(dataType)}
            label={dataLabel}/>
    );
  };

  return (
      <Paper>
        <Grid container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.root}>
          <Grid item xs={10}>
            <InviterSelect
                propagateInviterState={changePartnerState('isGoogler')}
                label={'Is your partner a Googler?'}
                labelTrue={'Googler'}
                labelFalse={'Noogler'}
            />
          </Grid>
          <Grid item xs={10}>
            {generatePartnersTextField('name', 'Your partner\'s full name')}
          </Grid>
          <Grid item xs={10}>
            {partnerState['isGoogler'] &&
            generatePartnersTextField('email',
                'Your partner\'s @google address')}
          </Grid>
          <Grid item xs={10}>
            <Button
                fullWidth
                margin="normal"
                onClick={() => {
                  props.propagateNewInviteeForm(partnerState);
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
