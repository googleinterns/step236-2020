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
