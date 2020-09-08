// @flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useStyles} from '../LayoutStyles';
import firebaseAuthenticator from '../Authenticator';
import MemberSelfService from './MemberSelfService';
import {Link} from 'react-router-dom';
import InviterSelfService from './InviterSelfService';
import {useFirebase} from '../../firebaseFeatures';

export default function SelfServicePage() {
  const classes = useStyles();
  const authUser = useFirebase().authUser;

  return (
      <Paper className={classes.paper}>
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            className={classes.gridContainer}>
          <Grid item className={classes.gridItem}>
            <Button className={classes.button}
                    component={Link}
                    to={'/'}
                    fullWidth>
              Back
            </Button>
          </Grid>
          <Grid item className={classes.gridItem}>
            {firebaseAuthenticator.isInviter(authUser) ?
                <InviterSelfService/> :
                <MemberSelfService/>}
          </Grid>
        </Grid>
      </Paper>
  );
}
