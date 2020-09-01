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

type PropsType = {
  action: any,
  open: boolean,
  onClose: (SyntheticEvent<>) => void
};

const ActionInfo = (props: PropsType): React.Node => {
  const {action, open, onClose} = props;

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
      <DialogActions>
        <Typography variant='h6'>
          Do you want to mark this action as resolved?
        </Typography>
        <Button onClick={onClose}>No</Button>
        <Button onClick={onClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionInfo;
