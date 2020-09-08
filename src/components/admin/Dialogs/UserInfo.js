// @flow
import * as React from 'react';
import Button from '@material-ui/core/Button';
import {Typography, Grid} from '@material-ui/core';
import styles from '../admin.module.css';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Fab,
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
  onClose: () => void,
  saveNote: (UserType, string) => Promise<>
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
  const {user, open, onClose, saveNote} = props;
  const [openForm, setOpenForm] = React.useState(false);
  const [textValue, setTextValue] = React.useState('');

  const handleInputChange = (event: any) => {
    setTextValue(event.target.value);
  };

  const handleSaveNote = () => {
    setOpenForm(false);
    const aux = textValue;
    setTextValue('');
    saveNote(user, aux);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={'paper'} >
      <DialogTitle>
        Membership information
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
              </p>
              <Fab
                size='small'
                color='primary'
                onClick={(): void => setOpenForm(true)}>
                <EditIcon />
              </Fab>
              <p className={styles.adminText}>{user.adminNote}</p>
              {openForm &&
              (<Grid>
                <TextField
                  disabled={!openForm}
                  id="outlined-full-width"
                  style={{margin: 8}}
                  placeholder="Add a new admin note"
                  fullWidth
                  value={textValue}
                  onChange={handleInputChange}
                  margin="normal"
                  variant="outlined"
                />
                <Button onClick={(): void => setOpenForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveNote}>
                  Save
                </Button>
              </Grid>)}
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

