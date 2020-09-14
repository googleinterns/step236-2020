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
  onConfirm: (PendingType) => Promise<>
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
