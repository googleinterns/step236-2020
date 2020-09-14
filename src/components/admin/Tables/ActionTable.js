// @flow
import * as React from 'react';
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
import IconButton from '@material-ui/core/IconButton';

import {
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core';

import styles from '../admin.module.css';
import {TablePaginationActions,
  computeEmptyRows,
  computeRows} from '../TablePaginationActions';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {Typography} from '@material-ui/core';
import type {ActionType} from '../FlowTypes.js';
import {
  getActions,
  getSolvedActions,
  moveSolvedAction,
} from '../../database/Queries.js';
import ActionInfo from '../Dialogs/ActionInfo';

export default function ActionTable(): React.Node {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedRow, setSelectedRow] = React.useState(-1);
  const [rows, setRows] = React.useState([]);
  const [tab, setTab] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      let newRows = [];
      if (tab === 0) {
        const start = page * rowsPerPage + 1;
        newRows = await getActions(start, rowsPerPage);
      } else {
        const start = page * rowsPerPage + 1;
        newRows = await getSolvedActions(start, rowsPerPage);
      }
      setRows(newRows);
    })();
  }, [page, rowsPerPage, tab]);

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

  const handleTabChange = (event: SyntheticEvent<>, newValue: number) => {
    setTab(newValue);
  };

  const handleSolveAction = async (action: ActionType) => {
    try {
      await moveSolvedAction(action.count);
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <Paper>
      <Toolbar className={styles.titleActionBar} variant='dense'>
        <Typography className={styles.titleText} variant='h6'>
          Immediate action required
        </Typography>
      </Toolbar>
      <AppBar position='relative' color='inherit'>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label='active' id={'tab-active'} />
          <Tab label='solved' id={'tab-solved'} />
        </Tabs>
      </AppBar>
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
            {computeRows(page, rows, rowsPerPage)
                .map((row: ActionType): React.Node => (
                  <TableRow key={row.count}>
                    <TableCell>{row.date.toDate().toLocaleString()}</TableCell>
                    <TableCell>{row.message}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(): void =>
                          handleSelectedRow(row.count)}>
                        <MoreHorizIcon />
                      </IconButton>
                    </TableCell>
                    <ActionInfo
                      action={row}
                      open={selectedRow === row.count}
                      onClose={handleCloseModal}
                      onConfirm={handleSolveAction}
                      tab={tab} >
                    </ActionInfo>
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
