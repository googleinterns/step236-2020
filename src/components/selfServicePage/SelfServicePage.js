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
import LoadingPlaceholder from '../LoadingPlaceholder';

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
    return <LoadingPlaceholder/>;
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
