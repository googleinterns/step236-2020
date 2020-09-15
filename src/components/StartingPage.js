import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useStyles} from './LayoutStyles';
import {Link} from 'react-router-dom';
import {signInWithGoogle} from '../firebaseFeatures';

export default function StartingPage() {
  const classes = useStyles();

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
                onClick={signInWithGoogle}>
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
                to="/form"
                onClick={signInWithGoogle}>
              Join the community!
            </Button>
          </Grid>

        </Grid>
      </Paper>
  );
}
