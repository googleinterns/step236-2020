// @flow
import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PartnerDataTextField from './InviteeDataTextField';
import InviterSelect from './InviterSelect';
import InviteeFormDatePicker from './InviteeFormDatePicker';
import {useStyles} from '../LayoutStyles';
import {useAuthUser} from '../../firebaseFeatures';

type PropsType = {
  propagateNewInviteeForm: any
}

export default function InviteeForm(props: PropsType) {
  const classes = useStyles();
  const authUser = useAuthUser();
  const [member, setMember] = useState({});
  const [partnerState, setPartnerState] = useState({
    name: '',
    email: '',
    isGoogler: false,
    startDate: new Date(),
  });

  React.useEffect(() => {
    if (authUser) {
      const memberEmail = authUser.email;
      console.log(authUser);
      setMember({email: memberEmail});
    }
  }, [authUser]);

  const changePartnerState = (key: string) => {
    return (newValue: any) => {
      if (!(key in partnerState)) {
        throw new Error(`Key "${key}" is unknown for partner state.`);
      }
      setPartnerState({...partnerState, [key]: newValue});
    };
  };  

  const generatePartnersTextField = (dataType: string, dataLabel: string) => {
    return (
        <PartnerDataTextField
            propagateData={changePartnerState(dataType)}
            label={dataLabel}/>
    );
  };

  return (
      <Paper
          className={classes.paper}>
        <Grid container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              className={classes.root}>
          <Grid item>
            <InviterSelect
                propagateInviterState={changePartnerState('isGoogler')}
                label={'Is your partner a Googler?'}
                labelTrue={'Googler'}
                labelFalse={'Noogler'}
            />
          </Grid>
          <Grid item>
            {generatePartnersTextField('name', 'Your full name')}
          </Grid>
          <Grid item>
            {partnerState['isGoogler'] ?
                generatePartnersTextField('email',
                    'Your partner\'s @google address') :
                <InviteeFormDatePicker
                    label={'When is your partner going to join Google?'}
                    propagateNewData={changePartnerState('startDate')}/>}
          </Grid>
          <Grid item>
            <Button
                fullWidth
                margin="normal"
                onClick={() => {
                  props.propagateNewInviteeForm(partnerState, member);
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
