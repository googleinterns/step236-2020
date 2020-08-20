import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
    backgroundColor: '#ffffff'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PartnerGoogleAccountSelect(props) {
  const classes = useStyles();
  const [googlerState, setGooglerState] = React.useState(true);

  const handleChange = (event) => {
    setGooglerState(event.target.value);
    props.propagateGooglerState(googlerState);
  };

  return(
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Is your partner a Googler?</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={googlerState}
            onChange={handleChange}
            required
        >
          <MenuItem value={true}>Noogler</MenuItem>
          <MenuItem value={false}>Googler</MenuItem>
        </Select>
      </FormControl>);

}