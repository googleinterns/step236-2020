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
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

type PropsType = {
  user: any,
  open: boolean,
  onClose: () => void,
  onConfirm: () => Promise<any>
};

const DeleteDialog = (props: PropsType): React.Node => {
  const {user, open, onClose, onConfirm} = props;

  return (
    <Dialog
      open={open}
      onClose={onClose} >
      <DialogTitle>
        Revoke {user.name}&apos;s membership?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          This action revokes a user&apos;s membership permanently
          and is irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
