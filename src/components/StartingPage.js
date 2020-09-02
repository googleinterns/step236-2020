import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useStyles} from './LayoutStyles';
import {Link} from 'react-router-dom';
import mockAuth from './Authenticator';

export default function StartingPage() {
  const classes = useStyles();

  const logIn = () => {
    mockAuth.logIn();
  };

  return (
      <Paper className={classes.paper}>
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            className={classes.gridContainer}>
          <Grid
              item
              className={classes.gridItem}>
            <Button
                variant="outlined"
                fullWidth
                className={classes.button}
                onClick={logIn}>
              Log in
            </Button>
          </Grid>
          <Grid
              item
              className={classes.gridItem}>
            <Button
                variant="outlined"
                fullWidth
                className={classes.button}
                component={Link}
                to="/form">
              Join the community!
            </Button>
          </Grid>

        </Grid>
      </Paper>
  );
}
