// @flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {useStyles} from '../LayoutStyles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function createData(
    name: string,
    description: string,
    membershipStatus: string,
) {
  return {
    name,
    description,
    membershipStatus,
  };
}

function Row(props) {
  const classes = useStyles();
  const {row} = props;
  const [open, setOpen] = React.useState(false);

  return (
      <React.Fragment>
        <TableRow>
          <TableCell>
            <IconButton aria-label="expand row" size="small"
                        onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.membershipStatus}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" component="div">
                  {row.description}
                </Typography>
                <Button variant={'outlined'} className={classes.button}>
                  {row.membershipStatus === 'member' ? 'Leave' : 'Join'}
                </Button>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
  );
}

function ManageAccountMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <div>
        <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.button}>
          Manage account
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile information</MenuItem>
          <MenuItem onClick={handleClose}>Leave community</MenuItem>
          <MenuItem onClick={handleClose}>Log out</MenuItem>
        </Menu>
      </div>
  );
}

const rows = [
  createData('Marketplace', 'Here you can buy household items', 'member'),
  createData('Book club', 'Share your favourite book!', 'join'),
  createData('Hiking club', 'Do you like hiking?', 'pending request'),
  createData('German lessons', 'Möchten Sie Schweizerdeutsch sprechen? :-)',
      'member'),
  createData('Art club', 'Do you like DYI?', 'join'),
];

export default function MemberSelfService() {
  const classes = useStyles();

  return (
      <Grid container
            direction="row">
        <Grid item xs={10}>
          <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              className={classes.gridContainer}>
            <Grid
                item
                className={classes.gridItem}>
              <TableContainer>
                <Table stickyHeader aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell/>
                      <TableCell>Group name</TableCell>
                      <TableCell align="right">Membership status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row}/>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <ManageAccountMenu/>
        </Grid>
      </Grid>
  );
}
