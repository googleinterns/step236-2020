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

type PropsType = {
  user: any,
  open: boolean,
  onClose: any
};

const PendingInfo = (props: PropsType): React.Node => {
  const {user, open, onClose} = props;

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
          {user.name} ({user.email})
          initiated a request on {user.date.toDateString()}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PendingInfo;
