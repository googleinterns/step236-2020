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
