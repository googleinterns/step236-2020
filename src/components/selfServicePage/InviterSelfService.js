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
import {
  retrievePendingUsers,
  confirmPendingUser,
  deletePendingUser,
  addInvitedUser,
} from '../database/Queries';
import {useAuthUser} from '../../firebaseFeatures';

function PendingRequestsTable(): React.Node {
  const classes = useStyles();
  const authUser = useAuthUser();
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (authUser) {
      const partnerEmail = authUser.email;
      (async () => {
        const newRows = await retrievePendingUsers(partnerEmail);
        setRows(newRows);
      })();
    }
  });

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
              <TableCell align="left">Email</TableCell>
              <TableCell align="right">
                Possible actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any): React.Node => (
              <TableRow key={row.count} hover>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell>
                  <Grid container
                    direction="row"
                    justify="flex-end">
                    <Grid item className={classes.gridItem}>
                      <Button className={classes.buttonSecondary}
                        onClick={async () => {
                          await deletePendingUser('email', row.email);
                          window.location.reload();
                        }}>
                        Delete
                      </Button>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                      <Button
                        disabled={row.isVerified}
                        className={classes.button}
                        onClick={async () => {
                          await confirmPendingUser('email', row.email);
                          console.log(`User has been accepted to the
                            community.`);
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
  const [email, setEmail] = React.useState("");
  const authUser = useAuthUser();

  const handleSendInvite = async () => {
    try {  
      if (authUser) {
        await addInvitedUser(authUser.email, email);
      }
    } catch (error) {
      console.log('Could not send invite. Maybe user has already been invited.');
    }
  };

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch">
      <InviterForm
        sendInvite={handleSendInvite}
        setEmailAddress={(newEmail) => setEmail(newEmail)}/>
      <Grid
        item
        className={classes.gridItem}>
        <PendingRequestsTable/>
      </Grid>
    </Grid>
  );
}
