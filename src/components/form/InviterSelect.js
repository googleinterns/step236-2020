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
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    textAlign: 'left',
    width: '100%',
  },

  inputLabel: {
    color: '#1d3557',
    '&.Mui-focused': {
      color: '#1d3557',
    },
  },

  select: {
    backgroundColor: '#ffffff',
    color: '#1d3557',
    '&:before': {
      borderColor: '#1d3557',
    },
    '&:after': {
      borderColor: '#1d3557',
    },
  },
}));

type PropsType = {
  label: string,
  labelTrue: string,
  labelFalse: string,
  propagateInviterState: any
}

export default function InviterSelect(props: PropsType) {
  const classes = useStyles();
  const [inviterState, setInviterState] = React.useState(false);

  const handleChange = (event: SyntheticInputEvent<>) => {
    setInviterState(event.target.value);
    props.propagateInviterState(event.target.value);
  };

  return (
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.inputLabel}>{props.label}</InputLabel>
        <Select
            className={classes.select}
            value={inviterState}
            onChange={handleChange}
            required
        >
          <MenuItem value={true}>{props.labelTrue}</MenuItem>
          <MenuItem value={false}>{props.labelFalse}</MenuItem>
        </Select>
      </FormControl>
  );
}
