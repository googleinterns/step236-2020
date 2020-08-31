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
  onClose: any
};

const DeleteDialog = (props: PropsType): React.Node => {
  const {user, open, onClose} = props;

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
        <Button onClick={onClose}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
