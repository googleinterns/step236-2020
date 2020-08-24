import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function createData(id, date, message) {
  return { id, date, message };
}

const fakeRows = [
  createData("1", new Date(), "[NOOGLER CHECK 1]: A partner of a noogler requires access"),
  createData("2", new Date(), "[DATABASE]: A new member could not be added to the database."),
  createData("3", new Date(), "[NOOGLER CHECK 2]: A partner of a noogler requires access"),
];

export default function ActionTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Immediate actions">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Message</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fakeRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date.toDateString()}</TableCell>
              <TableCell>{row.message}</TableCell>
              <TableCell><MoreHorizIcon /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}