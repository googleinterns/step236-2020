// @flow
import * as React from 'react';
import Button from '@material-ui/core/Button';
import {Typography, Grid} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import styles from '../admin.module.css';
import ReportIcon from '@material-ui/icons/Report';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';
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
import type {UserType} from '../FlowTypes.js';

type PropsType = {
  user: UserType,
  open: boolean,
  onClose: () => void
};

const groups = [
  {
    name: 'Hiking amateurs',
    description: 'A group to plan hikings between members.'},
  {
    name: 'Cooking advice',
    description: 'A group to exchange cooking recepies',
  },
];

const UserInfo = (props: PropsType): React.Node => {
  const {user, open, onClose} = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={'paper'} >
      <DialogTitle>
        Membership information
        <IconButton>
          <EditIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant='h6'>
          {user.name}
        </Typography>
        <Grid container spacing={3}>
          <Grid item>
            <Paper className={styles.note}>
              <p>
                Email: {user.email}
              </p>
              <p>
                Date when joined: {user.joinDate.toString()}
              </p>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={styles.note}>
              <p className={styles.adminNote}>
                Admin note
                <IconButton>
                  <ReportIcon />
                </IconButton>
              </p>
              <p className={styles.adminText}>{user.adminNote}</p>
            </Paper>
          </Grid>
          <Grid item>
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
                    {groups.map((group: any): React.Node => (
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Back</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserInfo;
