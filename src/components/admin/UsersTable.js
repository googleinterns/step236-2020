import React from 'react';
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
import styles from './admin.module.css';
import {Typography} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';

import TablePaginationActions from './TablePaginationActions';

const rows = Array.from(Array(30), (x, index) => ({
  id: index,
  name: 'John Dowe',
  email: 'johndowe@gmail.com',
}));

function EnhancedToolbar() {
  const handleOnSubmit = () => console.log('User has pressed search.');

  return (
    <Toolbar variant='dense' className={styles.titleUsersBar}>
      <Typography variant='h6' className={styles.titleUsersText}>
        Active members
      </Typography>
      <form onSubmit={handleOnSubmit}>
        <TextField
          id='outlined-margin-dense'
          placeholder='Search users...'
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

function computeEmptyRows(rowsPerPage, page) {
  return rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
}

function computeRows(page, rows, rowsPerPage) {
  if (rowsPerPage > 0) {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }
  return rows;
}

export default function UsersTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = computeEmptyRows(rowsPerPage, page);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
            {computeRows(page, rows, rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell><EditIcon /></TableCell>
                <TableCell><DeleteIcon/></TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{height: 53 * emptyRows}}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter className={styles.footer}>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                count={rows.length}
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
