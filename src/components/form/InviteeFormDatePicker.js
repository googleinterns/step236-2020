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
import React, {useState} from 'react';
import {createMuiTheme} from '@material-ui/core';
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import {makeStyles, ThemeProvider} from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#1d3557',
      textContrast: '#1d3557',
    },
    secondary: {
      main: '#1d3557',
    },
  },
});

const useStyles = makeStyles(() => ({
  datePicker: {
    width: '100%',
  },
}));

type PropsType = {
  label: string,
  propagateNewData: any
}

function InviteeFormDatePicker(props: PropsType) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChange = (newDate: Date) => {
    props.propagateNewData(newDate);
    setSelectedDate(newDate);
  };

  return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={defaultMaterialTheme}>
          <DatePicker
              label={props.label}
              value={selectedDate}
              onChange={handleChange}
              margin="normal"
              openTo="year"
              format="dd/MM/yyyy"
              views={['year', 'month', 'date']}
              className={classes.datePicker}
          />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
  );
}

export default InviteeFormDatePicker;
