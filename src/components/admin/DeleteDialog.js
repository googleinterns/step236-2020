import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

// eslint-disable-next-line react/display-name
const DeleteDialog = React.forwardRef((props, ref) => {
  const {open, onClose} = props;

  return (
    <Dialog
      ref={ref}
      open={open}
      onClose={onClose} >
      <DialogTitle>
        {`Revoke this user's membership?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`This action revokes a user's membership permanently 
          and is irreversible.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {`Cancel`}
        </Button>
        <Button onClick={onClose}>
          {`Delete`}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteDialog;
