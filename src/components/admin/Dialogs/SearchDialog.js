// @flow
import * as React from 'react';
import {UserRow} from '../UserRow';
import {deleteUser, updateAdminNote} from '../../database/Queries';
import type {UserType} from '../../types/FlowTypes.js';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';

type PropType = {
  open: boolean,
  onClose: () => void,
  rows: Array<UserType>
};

export const SearchDialog = (props: PropType): React.Node => {
  const {open, onClose, rows} = props;
  const [selectedRow, setSelectedRow] = React.useState(-1);
  const [selectedDelete, setSelectedDelete] = React.useState(-1);

  const handleSelectedRow = (rowId: number) => {
    setSelectedRow(rowId);
  };

  const handleCloseModal = () => {
    setSelectedRow(-1);
  };

  const handleOpenDialog = (rowId: number) => {
    setSelectedDelete(rowId);
  };

  const handleCloseDialog = () => {
    setSelectedDelete(-1);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser('count', selectedDelete);
      setSelectedDelete(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const saveNote = async (user: UserType, note: string) => {
    try {
      await updateAdminNote('email', user.email, note);
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={'paper'}>
      <DialogTitle>
        Search Results
      </DialogTitle>
      <DialogContent>
        {rows.length > 0 ?
        (<TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row: UserType): React.Node => (
                <UserRow
                  key={row.count}
                  open={row.count === selectedRow}
                  row={row}
                  openDelete={selectedDelete === row.count}
                  handleRow={handleSelectedRow}
                  handleOpenDialog={handleOpenDialog}
                  handleCloseDialog={handleCloseDialog}
                  handleConfirmDelete={handleConfirmDelete}
                  saveNote={saveNote}
                  handleCloseModal={handleCloseModal}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>) :
        (<DialogContentText>
          No search results could be found.
        </DialogContentText>)}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
};
