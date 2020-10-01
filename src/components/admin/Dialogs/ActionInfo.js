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
import * as React from 'react';
import Button from '@material-ui/core/Button';
import {Typography} from '@material-ui/core';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';
import type {ActionType} from '../../types/FlowTypes.js';

type PropsType = {
  action: ActionType,
  open: boolean,
  onClose: () => void,
  onConfirm: (ActionType) => Promise<any>,
  tab: 'active' | 'solved'
};

const ActionInfo = (props: PropsType): React.Node => {
  const {action, open, onClose, onConfirm, tab} = props;

  const handleConfirm = () => {
    onConfirm(action);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={'paper'}>
      <DialogTitle>
        Action details
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {action.message}
        </DialogContentText>
      </DialogContent>
      {tab === 'active' ?
        <DialogActions>
          <Typography variant='h6'>
            Do you want to mark this action as resolved?
          </Typography>
          <Button onClick={onClose}>No</Button>
          <Button onClick={handleConfirm}>Yes</Button>
        </DialogActions> :
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>}
    </Dialog>
  );
};

export default ActionInfo;
