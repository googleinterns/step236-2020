import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {DialogContentText,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle} from '@material-ui/core';

// eslint-disable-next-line react/display-name
const UserInfo = React.forwardRef((props, ref) => {
  const {user, open, onClose, onEntering} = props;

  return (
    <Dialog
      ref={ref}
      open={open}
      onClose={onClose}
      onEntering={onEntering}
      scroll={'paper'} >
      <DialogTitle>Membership information</DialogTitle>
      <DialogContent>
        <DialogContentText ref={ref}>
            The name is: {user.name} and the email is {user.email}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Back</Button>
      </DialogActions>
    </Dialog>
  );
});

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onEntering: PropTypes.func.isRequired,
};

export default UserInfo;

