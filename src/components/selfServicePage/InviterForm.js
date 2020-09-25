// @flow
import React from 'react';
import InviteeDataTextField from '../form/InviteeDataTextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {useStyles} from '../LayoutStyles';

export default function InviterForm(props: any) {
  const classes = useStyles();

  return (
      <Grid container
            justify="space-around"
            alignItems='center'>
        <Grid item xs={9}>
          <InviteeDataTextField
              propagateData={(data) => props.setEmailAddress(data)}
              label={'Your invitee email address'}/>
        </Grid>
        <Grid item xs={2}>
          <Button 
            className={classes.button}
            onClick={props.sendInvite}>Send invite!</Button>
        </Grid>
      </Grid>
  );
}
