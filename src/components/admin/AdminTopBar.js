/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// @flow
import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './admin.module.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {signOutFromGoogle} from '../../firebaseFeatures';

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
