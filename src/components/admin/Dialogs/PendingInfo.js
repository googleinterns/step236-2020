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
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';
import type {PendingType} from '../../types/FlowTypes.js';

type PropsType = {
  user: PendingType,
  open: boolean,
  onClose: () => void,
  onConfirm: (PendingType) => Promise<any>
};

const PendingInfo = (props: PropsType): React.Node => {
  const {user, open, onClose, onConfirm} = props;

  const handleConfirm = () => {
    onConfirm(user);
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={'paper'}>
      <DialogTitle>
        Pending request information
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {user.email}
          initiated a request on {user.date.toDate().toLocaleString()}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
        <Button onClick={handleConfirm}>
          Confirm membership
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PendingInfo;
