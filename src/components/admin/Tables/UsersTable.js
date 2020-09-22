// @flow
import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import styles from '../admin.module.css';
import {Typography} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
//import {SearchDialog} from '../Dialogs/SearchDialog';
import {UserRow} from '../UserRow';

import {
  TablePaginationActions,
  computeEmptyRows,
} from '../TablePaginationActions';
import type {UserType} from '../../types/FlowTypes.js';
import {
  getActiveMembers,
  getCounter,
  deleteUser,
  updateAdminNote,
} from '../../database/Queries.js';

function EnhancedToolbar(): React.Node {
  const handleOnSubmit = (): void => console.log('User has pressed search.');

  return (
    <Toolbar variant='dense' className={styles.titleUsersBar}>
      <Typography variant='h6' className={styles.titleUsersText}>
        Active members
      </Typography>
      <form onSubmit={handleOnSubmit}>
        <TextField
          id='outlined-margin-dense'
          placeholder='Search users by email...'
          margin='dense'
          variant='outlined'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Toolbar>
  );
}

export default function UsersTable(): React.Node {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedRow, setSelectedRow] = React.useState(-1);
  const [selectedDelete, setSelectedDelete] = React.useState(-1);
  const [rows, setRows] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  //const [search, setSearch] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const start = page * rowsPerPage + 1;
      const counter = await getCounter('activeMembers');
      const newRows = await getActiveMembers(start, rowsPerPage);
      setCounter(counter);
      setRows(newRows);
    })();
  }, [page, rowsPerPage, selectedDelete]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: SyntheticEvent<>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    <Paper>
      <EnhancedToolbar />
      <TableContainer>
        <Table aria-label='Active members' size='small'>
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
                row={row}
                open={selectedRow === row.count}
                openDelete={selectedDelete === row.count}
                handleRow={handleSelectedRow}
                handleOpenDialog={handleOpenDialog}
                handleConfirmDelete={handleConfirmDelete}
                handleCloseDialog={handleCloseDialog}
                saveNote={saveNote}
                handleCloseModal={handleCloseModal} />))}
            {computeEmptyRows(rowsPerPage, page, rows) > 0 && (
              <TableRow style={{height: 42.4 *
                    computeEmptyRows(rowsPerPage, page, rows)}}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter className={styles.footer}>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                count={counter}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {'aria-label': 'rows per page'},
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}
