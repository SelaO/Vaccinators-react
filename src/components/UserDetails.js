import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display:'flex',
    flexDirection:'row',
    alignItems:'baseline',
    justifyContent:'space-Between',
    width:'50%'
  },
});

function UserDetails(props) {
  const { classes } = props;

  return (
    <div className = "UserDetails-Container" style = {{'bgColor':'red'}}>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          First Name
        </Typography>
        <Typography component="h3">
          {props.firstName}
        </Typography>
      </Paper>

      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          Last Name
        </Typography>
        <Typography component="h3">
         {props.lastName}
        </Typography>
      </Paper>

      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          Age
        </Typography>
        <Typography component="h3">
          {props.age}
        </Typography>
      </Paper>

      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
         ID
        </Typography>
        <Typography component="h3">
         {props.id}
        </Typography>
      </Paper>

      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          Birth Country
        </Typography>
        <Typography component="h3">
          {props.countryOfBirth}
        </Typography>
      </Paper>
    </div>
  );
}

UserDetails.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  countryOfBirth: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserDetails);
