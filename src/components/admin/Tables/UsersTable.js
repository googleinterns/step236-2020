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
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';
import DeleteDialog from '../Dialogs/DeleteDialog';

import {TablePaginationActions,
  computeEmptyRows,
  computeRows} from '../TablePaginationActions';

import UserInfo from '../Dialogs/UserInfo';

const rows = Array.from(Array(30), (x: any, index: number): any => ({
  id: index,
  name: 'John Dowe',
  email: 'johndowe@gmail.com',
  note: 'Need to check for their partner\'s new google email',
  joinDate: new Date(),
  groups: [
    {
      name: 'Hiking amateurs',
      description: 'A group to plan hikings between members.'},
    {
      name: 'Cooking advice',
      description: 'A group to exchange cooking recepies',
    }],
}));

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

export default function UsersTable(): React.Node {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedRow, setSelectedRow] = React.useState(-1);
  const [selectedDelete, setSelectedDelete] = React.useState(-1);

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
            {computeRows(page, rows, rowsPerPage)
                .map((row: any): React.Node => (
                  <TableRow
                    key={row.id} >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(): void =>
                          handleSelectedRow(row.id)}>
                        <InfoOutlinedIcon/>
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(event: any): void =>
                          handleOpenDialog(row.id)}>
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>
                    <DeleteDialog
                      user={row}
                      open={selectedDelete === row.id}
                      onClose={handleCloseDialog} />
                    <UserInfo
                      user={row}
                      open={selectedRow === row.id}
                      onClose={handleCloseModal} >
                    </UserInfo>
                  </TableRow>
                ))}
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
