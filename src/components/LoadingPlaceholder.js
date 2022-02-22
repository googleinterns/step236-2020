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

import React from 'react';
import ReactLoading from 'react-loading';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {useStyles} from './LayoutStyles';
import Box from '@material-ui/core/Box';

export default function LoadingPlaceholder() {
  const classes = useStyles();

  return (
      <Paper className={classes.paper}>
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.gridContainer}>
          <Grid
              item
              className={classes.gridItem}>
            <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">
            PLEASE WAIT
            </Box>
          </Grid>
          <Grid
              item
              className={classes.gridItem}>
            <ReactLoading type="cubes" color="#a8dadc"/>
          </Grid>
        </Grid>
      </Paper>);
}

