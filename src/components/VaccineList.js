import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class VaccineList extends Component {
  setAsyncState = newState =>
    new Promise(resolve => this.setState(newState, () => resolve()));

  render() {
    const { classes } = this.props;
    return (
      <div className="UserPage-container" >
        <Paper className={classes.root} style={{backgroundColor: 'lightYellow'}}>
          <Table className={classes.table} style={{backgroundColor: 'lightYellow'}}>
            <TableHead>
              <TableRow >
                <TableCell style={{fontSize: '0.82em', fontWeight: 'bold'}} >Vaccine Name</TableCell>
                <TableCell style={{fontSize: '0.82em', fontWeight: 'bold'}} align="right">Given Date</TableCell>
                <TableCell style={{fontSize: '0.82em', fontWeight: 'bold'}} align="right">Expiration Date</TableCell>
                <TableCell style={{fontSize: '0.82em', fontWeight: 'bold'}} align="right">Description</TableCell>
                <TableCell style={{fontSize: '0.82em', fontWeight: 'bold'}} align="right">Medical Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{new Date(row.given_date.seconds * 1000).toLocaleDateString().replace(/\//g, '-')}</TableCell>
                  <TableCell align="right">{new Date(row.due_date.seconds * 1000).toLocaleDateString().replace(/\//g, '-')}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.md_number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

VaccineList.propTypes = {
  classes: PropTypes.object.isRequired,
  rows: PropTypes.array
};

export default withStyles(styles)(VaccineList);
