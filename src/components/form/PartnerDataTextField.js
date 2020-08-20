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
      textColor: `#577399`,
      borderColor: `#a8dadc`,
    },
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: '#a8dadc',
  },

}));

export default function GooglerDataTextField(props) {
  const classes = useStyles();
  const [data, setData] = useState('');

  const handleChange = (newData) => {
    setData(newData);
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
            margin="normal"
        />
      </form>
  );
}

