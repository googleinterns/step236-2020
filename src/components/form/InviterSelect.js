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

export default function InviterSelect(props) {
  const classes = useStyles();
  const [inviterState, setInviterState] = React.useState(false);

  // function: Event => ()
  const handleChange = (event) => {
    setInviterState(event.target.value);
    props.propagateInviterState(event.target.value);
  };

  return (
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.input}>{props.label}</InputLabel>
        <Select
            className={classes.input}
            value={inviterState}
            onChange={handleChange}
            required
        >
          <MenuItem value={true}>{props.labelTrue}</MenuItem>
          <MenuItem value={false}>{props.labelFalse}</MenuItem>
        </Select>
      </FormControl>);
}
