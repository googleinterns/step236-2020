import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {useStyles} from '../LayoutStyles';
import firebaseAuthenticator from '../Authenticator';
import {
  signOutFromGoogle,
  useAuthUser,
} from '../../firebaseFeatures';

export default function LandingPage() {
  const classes = useStyles();
  const authUser = useAuthUser();
  const [landingPageContent, setlandingPageContent] = useState(null);

  useEffect(() => {
    if (landingPageContent !== null) {
      return;
    }
    firebaseAuthenticator.isAdmin(authUser).then((adminStatus) => {
      let newLandingPageContent = [
        {to: '/self-service', label: 'Self service page'},
        {to: '/restricted-area', label: 'Restricted area'}];
      if (adminStatus) {
        newLandingPageContent.push({to: '/admin', label: 'Admin panel'});
      }
      setlandingPageContent(newLandingPageContent);
    });
  });

  if (landingPageContent === null) {
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

          <Grid
              item
              className={classes.gridItem}>
            <Button component={Link}
                    to={'/'}
                    variant="outlined"
                    fullWidth
                    className={classes.button}
                    onClick={signOutFromGoogle}>
              Log out
            </Button>
          </Grid>
          {
            landingPageContent.map(
                (element) => {
                  return (
                      <Grid
                          item
                          className={classes.gridItem}
                          key={element.label}>
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
