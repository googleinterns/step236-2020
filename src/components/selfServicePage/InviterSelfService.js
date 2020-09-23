// @flow
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import InviterForm from './InviterForm';
import {useStyles} from '../LayoutStyles';

function createData(name: string, surname: string, key: number): any {
  return {name, surname, key};
}

function PendingRequestsTable(): React.Node {
  const classes = useStyles();

  const defaultList = [
    createData('John', 'Doe', 1),
    createData('Foo', 'Bar', 2),
  ];

  const [list, setList] = React.useState(defaultList);

  return (
    <Grid container
      justify="center">
      <TableContainer>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow hover>
              <TableCell component={'th'} scope={'row'}>
                Name
              </TableCell>
              <TableCell align="left">Surname</TableCell>
              <TableCell align="right">
                Possible actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row: any): React.Node => (
              <TableRow key={row.key} hover>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.surname}</TableCell>
                <TableCell>
                  <Grid container
                    direction="row"
                    justify="flex-end">
                    <Grid item className={classes.gridItem}>
                      <Button className={classes.buttonSecondary}
                        onClick={() => {
                          console.log(`User has been deleted from
                              pending requests list.`);
                          setList(list.filter((item: any): boolean =>
                            (item.key !== row.key)));
                        }}>
                        Delete
                      </Button>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                      <Button className={classes.button}
                        onClick={() => {
                          console.log(`User has been accepted to the
                            community.`);
                          setList(list.filter((item: any): boolean =>
                            (item.key !== row.key)));
                        }}>
                          Accept
                      </Button>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default function InviterSelfService(): React.Node {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch">
      <InviterForm/>
      <Grid
        item
        className={classes.gridItem}>
        <PendingRequestsTable/>
      </Grid>
    </Grid>
  );
}
