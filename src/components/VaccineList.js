import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function createData(id,name,given_date,due_date,description) {
  return { id, name,given_date,due_date,description };
}

const rows = [
  createData(2,'Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData(2,'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData(2,'Eclair', 262, 16.0, 24, 6.0),
  createData(2,'Cupcake', 305, 3.7, 67, 4.3),
  createData(2,'Gingerbread', 356, 16.0, 49, 3.9),
];

function VaccineList(props) {
  const { classes } = props;

  return (
    <div className= "UserPage-container">
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Vaccine Name</TableCell>
            <TableCell align="right">Given Date</TableCell>
            <TableCell align="right">Expiration Date</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.given_date}</TableCell>
              <TableCell align="right">{row.due_date}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    </div> 
  
  );
}

VaccineList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VaccineList);
