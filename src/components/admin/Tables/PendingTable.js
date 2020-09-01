// @flow
import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Toolbar from '@material-ui/core/Toolbar';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import styles from '../admin.module.css';
import {Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import {TablePaginationActions,
  computeEmptyRows,
  computeRows} from '../TablePaginationActions';

import PendingInfo from '../Dialogs/PendingInfo';

function createData(id: number, name: string,
    email: string, date: any): {id: number, name: string,
    email: string, date: any} {
  return {id, name, email, date};
}

const rows = [
  createData(1, 'Alice Joy', 'alicee@gmail.com', new Date()),
  createData(2, 'David Toms', 'dt@yahoo.com', new Date()),
];

export default function PendingTable(): React.Node {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedPending, setSelectedPending] = React.useState(-1);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: SyntheticEvent<>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (rowId: number) => {
    setSelectedPending(rowId);
  };

  const handleCloseDialog = () => {
    setSelectedPending(-1);
  };

  return (
    <Paper>
      <Toolbar className={styles.titlePendingBar} variant='dense'>
        <Typography variant='h6'>
          Pending requests
        </Typography>
      </Toolbar>
      <TableContainer>
        <Table aria-label='Pending memberships' size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {computeRows(page, rows, rowsPerPage)
                .map((row: any): React.Node => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(): void =>
                          handleOpenDialog(row.id)}>
                        <MoreHorizIcon/>
                      </IconButton>
                    </TableCell>
                    <PendingInfo
                      user={row}
                      open={row.id === selectedPending}
                      onClose={handleCloseDialog} />
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
