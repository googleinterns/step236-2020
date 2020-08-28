import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useStyles} from '../LayoutStyles';
import mockAuth from '../Authenticator';
import MemberSelfService from './MemberSelfService';
import {Link} from 'react-router-dom';
import InviterSelfService from './InviterSelfService';

export default function SelfServicePage() {
  const classes = useStyles();

  return (
      <Paper className={classes.paper}>
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            className={classes.gridContainer}>
          {mockAuth.isInviter() ? <InviterSelfService/> : <MemberSelfService/>}
          <Button className={classes.button} component={Link}
                  to={'/'}>Back</Button>
        </Grid>
      </Paper>
  );
}
