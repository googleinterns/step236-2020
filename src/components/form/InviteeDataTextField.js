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
