import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: '#ffffff',
    color: '#457b9d',
    minWidth: 120,
    textAlign: 'left',
    width: '100%',
  },

  input: {
    color: '#1d3557',
    '&:before': {
      color: '#1d3557',
    },
    '&:after': {
      color: '#1d3557',
    },
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PartnerGoogleAccountSelect(props) {
  const classes = useStyles();
  const [googlerState, setGooglerState] = React.useState(true);

  // function: Event => ()
  const handleChange = (event) => {
    setGooglerState(event.target.value);
    props.propagateGooglerState(googlerState);
  };

  return (
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.input}>Is your partner a
          Googler?</InputLabel>
        <Select
            className={classes.input}
            value={googlerState}
            onChange={handleChange}
            required
        >
          <MenuItem value={true}>Noogler</MenuItem>
          <MenuItem value={false}>Googler</MenuItem>
        </Select>
      </FormControl>);
}
