// @flow
import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useStyles} from '../LayoutStyles';
import firebaseAuthenticator from '../Authenticator';
import MemberSelfService from './MemberSelfService';
import {Link} from 'react-router-dom';
import InviterSelfService from './InviterSelfService';
import {useAuthUser} from '../../firebaseFeatures';

export default function SelfServicePage() {
  const classes = useStyles();
  const authUser = useAuthUser();
  const [isInviter, setIsInviter] = useState(null);

  useEffect(() => {
    let cancelled = false;
    firebaseAuthenticator.isInviter(authUser).then((checkResult) => {
      if (!cancelled) {
        setIsInviter(checkResult);
      }
    });
    return () => {
      cancelled = true;
    };
  });

  if (isInviter === null) {
    return <h1>Loading...</h1>;
  }

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
            {isInviter ?
                <InviterSelfService/> :
                <MemberSelfService/>}
          </Grid>
        </Grid>
      </Paper>
  );
}
