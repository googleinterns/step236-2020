import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {Typography, Grid} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle} from '@material-ui/core';
import {
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  TableCell,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

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
      <DialogTitle>
        Membership information
        <IconButton>
          <EditIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid>
          <Typography variant='h6'>
            {user.name}
          </Typography>
          <p>
            Email: {user.email}
          </p>
          <p>
            Date when joined: {user.joinDate.toDateString()}
          </p>
        </Grid>
        <Grid>
          <Paper>
            <TableContainer>
              <Table aria-label='mailing groups' size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Group name</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.groups.map((group) => (
                    <TableRow key={group.name}>
                      <TableCell>{group.name}</TableCell>
                      <TableCell>{group.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
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

