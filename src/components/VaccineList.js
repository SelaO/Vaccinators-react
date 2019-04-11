import React from "react";
import { Component } from "react";
import PropTypes, { func } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getUsersVaccines } from "../logic/backend";

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

function createData(
  id,
  name,
  given_date,
  due_date,
  description,
  given_location,
  md_number
) {
  return {
    id,
    name,
    given_date,
    due_date,
    description,
    given_location,
    md_number
  };
}

class VaccineList extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] };
    this.getVaccines = this.getVaccines.bind(this);

    // await getUsersVaccines("1").then(e => (rows = e));
  }

  getVaccines() {
    let rows = [];

    console.log("777", rows);

    getUsersVaccines("1").then(e => {
      this.setAsyncState({ rows: e });
    });
  }

  setAsyncState = newState =>
    new Promise(resolve => this.setState(newState, () => resolve()));

  render() {
    this.getVaccines();
    const { classes } = this.props;

    return (
      <div className="UserPage-container">
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Vaccine Name</TableCell>
                <TableCell align="right">Given Date</TableCell>
                <TableCell align="right">Expiration Date</TableCell>
                <TableCell align="right">Given Location</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">MD</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.given_date}</TableCell>
                  <TableCell align="right">{row.due_date}</TableCell>
                  <TableCell align="right">{row.given_location}</TableCell>
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VaccineList);
