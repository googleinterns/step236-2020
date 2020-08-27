import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {useStyles} from '../LayoutStyles';
import mockAuth from '../Authenticator';

export default function LandingPage() {
  const classes = useStyles();

  /* This part will be fetched from server */
  let landingPageContent = [
    {to: '/self-service', label: 'Self service page'},
    {to: '/restricted-area', label: 'Restricted area'}];
  if (mockAuth.isAdmin()) {
    landingPageContent.push({to: '/admin', label: 'Admin panel'});
  }
  /* End of part fetched from the server */

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
            <Button component={Link}
                    to={'/'}
                    variant="outlined"
                    fullWidth
                    className={classes.button}
                    onClick={() => {
                      mockAuth.logOut();
                    }}>
              Log out
            </Button>
          </Grid>
          {
            landingPageContent.map(
                (element) => {
                  return (
                      <Grid
                          item
                          className={classes.gridItem}>
                        <Button component={Link}
                                to={element.to}
                                variant="outlined"
                                fullWidth
                                className={classes.button}>
                          {element.label}
                        </Button>
                      </Grid>
                  );
                },
            )
          }
        </Grid>
      </Paper>
  );
}