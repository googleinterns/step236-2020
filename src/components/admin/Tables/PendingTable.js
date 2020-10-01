/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
  computeEmptyRows} from '../TablePaginationActions';

import PendingInfo from '../Dialogs/PendingInfo';
import {getPendingMembers, getCounter} from '../../database/Queries.js';
import type {PendingType} from '../../types/FlowTypes.js';
import {movePendingUser} from '../../database/Queries.js';

export default function PendingTable(): React.Node {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedPending, setSelectedPending] = React.useState(-1);
  const [rows, setRows] = React.useState([]);
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      const start = page * rowsPerPage + 1;
      const counter = await getCounter('pendingMembers');
      const newRows = await getPendingMembers(start, rowsPerPage);
      setRows(newRows);
      setCounter(counter);
    })();
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

  const handleConfirmDialog = async (user: PendingType) => {
    try {
      await movePendingUser('email', user.email);
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
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
            {rows
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
                      onClose={handleCloseDialog}
                      onConfirm={handleConfirmDialog} />
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
