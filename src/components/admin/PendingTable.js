import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function createData(id, name, email) {
  return { id, name, email };
}

const fakeRows = [
  createData("1", "Alice Joy", "alicee@gmail.com"),
  createData("2", "David Toms", "dt@yahoo.com"),
];

export default function PendingTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Pending memberships">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fakeRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell><MoreHorizIcon /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}