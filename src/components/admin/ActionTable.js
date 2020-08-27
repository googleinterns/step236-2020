import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Toolbar from '@material-ui/core/Toolbar';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import styles from './admin.module.css';
import {TablePaginationActions,
  computeEmptyRows} from './TablePaginationActions';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {Typography} from '@material-ui/core';

const rows = Array.from([
  '[NOOGLER CHECK 1]: A partner of a noogler requires access',
  '[DATABASE]: A new member could not be added to the database.',
  '[NOOGLER CHECK 2]: A partner of a noogler requires access',
], (message, id) => ({
  id,
  message,
  date: new Date(),
}));

function computeRows(page, rows, rowsPerPage) {
  if (rowsPerPage > 0) {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }
  return rows;
}

export default function ActionTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <Toolbar className={styles.titleActionBar} variant='dense'>
        <Typography className={styles.titleText} variant='h6'>
          Immediate action required
        </Typography>
      </Toolbar>
      <TableContainer>
        <Table aria-label='Immediate actions' size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Message</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {computeRows(page, rows, rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date.toDateString()}</TableCell>
                <TableCell>{row.message}</TableCell>
                <TableCell><MoreHorizIcon /></TableCell>
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
