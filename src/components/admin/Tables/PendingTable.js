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
import {fieldQuery} from '../../database/Queries.js';
import type {PendingType} from '../FlowTypes.js';

export default function PendingTable(): React.Node {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedPending, setSelectedPending] = React.useState(-1);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchRows = async () => {
      const start = page * rowsPerPage + 1;
      const newRows = await fieldQuery('pending-members', 'count',
          start, rowsPerPage);
      setRows(newRows);
    };

    fetchRows();
  }, [page, rowsPerPage]);

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
              <TableCell>Email</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {computeRows(page, rows, rowsPerPage)
                .map((row: PendingType): React.Node => (
                  <TableRow key={row.count}>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(): void =>
                          handleOpenDialog(row.count)}>
                        <MoreHorizIcon/>
                      </IconButton>
                    </TableCell>
                    <PendingInfo
                      user={row}
                      open={row.count === selectedPending}
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
