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

