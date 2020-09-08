// @flow
import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './admin.module.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {useFirebase} from '../../firebaseFeatures';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1d3557',
    },
    secondary: {
      main: '#457b9d',
    },
  },
});

export default function AdminTopBar(): React.Node {
  const signOutFromGoogle = useFirebase().signOutFromGoogle;

  return (
    <ThemeProvider theme={theme}>
      <AppBar className={styles.topBar} position='static'>
        <Toolbar>
          <Typography variant='h6' className={styles.header}>
            Spooglers.org admin
          </Typography>
          <Button color='inherit' onClick={signOutFromGoogle}>Log out</Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
