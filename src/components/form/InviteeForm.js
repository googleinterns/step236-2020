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
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PartnerDataTextField from './InviteeDataTextField';
import InviterSelect from './InviterSelect';
import InviteeFormDatePicker from './InviteeFormDatePicker';
import {useStyles} from '../LayoutStyles';

type PropsType = {
  propagateNewInviteeForm: any
}

export default function InviteeForm(props: PropsType) {
  const classes = useStyles();

  const [partnerState, setPartnerState] = useState({
    name: '',
    email: '',
    isGoogler: false,
    startDate: new Date(),
  });

  const changePartnerState = (key: string) => {
    return (newValue: any) => {
      if (!(key in partnerState)) {
        throw new Error(`Key "${key}" is unknown for partner state.`);
      }
      setPartnerState({...partnerState, [key]: newValue});
    };
  };

  const generatePartnersTextField = (dataType: string, dataLabel: string) => {
    return (
        <PartnerDataTextField
            propagateData={changePartnerState(dataType)}
            label={dataLabel}/>
    );
  };

  return (
      <Paper
          className={classes.paper}>
        <Grid container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              className={classes.root}>
          <Grid item>
            <InviterSelect
                propagateInviterState={changePartnerState('isGoogler')}
                label={'Is your partner a Googler?'}
                labelTrue={'Googler'}
                labelFalse={'Noogler'}
            />
          </Grid>
          <Grid item>
            {generatePartnersTextField('name', 'Your partner\'s full name')}
          </Grid>
          <Grid item>
            {partnerState['isGoogler'] ?
                generatePartnersTextField('email',
                    'Your partner\'s @google address') :
                <InviteeFormDatePicker
                    label={'When is your partner going to join Google?'}
                    propagateNewData={changePartnerState('startDate')}/>}
          </Grid>
          <Grid item>
            <Button
                fullWidth
                margin="normal"
                onClick={() => {
                  props.propagateNewInviteeForm(partnerState);
                }}
                variant="outlined"
                className={classes.button}>
              Submit!
            </Button>
          </Grid>
        </Grid>
      </Paper>
  );
}
