import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  textField: {
    backgroundColor: '#ffffff',
    width: '100%',
    margin: 8,
  },

  cssLabel: {
    color: '#577399',
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      color: '#a8dadc',
      textColor: `#577399`,
      borderColor: `#577399`,
    },
    color: '#a8dadc'
  },

  cssFocused: {
    color: '#a8dadc'
  },

  notchedOutline: {
    borderWidth: '1px',
    borderColor: '#577399',
    textColor: '#577399'
  },

}));

export default function GooglerDataTextField(props) {
  const classes = useStyles();
  const [data, setData] = useState('');

  const handleChange = (newData) => {
    setData(newData.target.value);
    props.propagateData(data);
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
        />
      </form>
  );
}

