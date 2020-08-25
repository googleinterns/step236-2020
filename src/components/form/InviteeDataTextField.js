// @flow
import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  textField: {
    backgroundColor: '#ffffff',
    width: '100%',
  },

  cssLabel: {
    color: '#1d3557',
    '&$cssFocused': {
      color: '#1d3557',
    },
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      color: '#1d3557',
      textColor: `#1d3557`,
      borderColor: `#1d3557`,
    },
  },

  cssFocused: {
    color: '#1d3557',
  },

  notchedOutline: {
    borderWidth: '1px',
    borderColor: '#1d3557',
    textColor: '#1d3557',
  },
}));

type PropsType = {
  propagateData: any,
  label: string
}

export default function InviteeDataTextField(props: PropsType) {
  const classes = useStyles();
  const [data, setData] = useState('');

  const handleChange = (event: SyntheticInputEvent<>) => {
    setData(event.target.value);
    props.propagateData(event.target.value);
  };

  return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
            id="standard-name"
            label={props.label}
            className={classes.textField}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
            }}
        >{data}</TextField>
      </form>
  );
}
