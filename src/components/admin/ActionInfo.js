import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {Typography} from '@material-ui/core';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';

// eslint-disable-next-line react/display-name
const ActionInfo = React.forwardRef((props, ref) => {
  const {action, open, onClose, onEntering} = props;

  return (
    <Dialog
      ref={ref}
      open={open}
      onClose={onClose}
      onEntering={onEntering}
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
});

ActionInfo.propTypes = {
  action: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onEntering: PropTypes.func.isRequired,
};

export default ActionInfo;
