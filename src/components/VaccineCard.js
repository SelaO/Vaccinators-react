import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  CardContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr"
  }
};

function VaccineCard(props) {
  const { classes, name, date, location, md, outdate } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.CardContent}>
        <div>{name}</div>
        <div>{date}</div>
        <div>{location}</div>
        <div>{md}</div>
        <div>{outdate}</div>
      </CardContent>
    </Card>
  );
}

VaccineCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  date: PropTypes.string,
  location: PropTypes.string,
  md: PropTypes.string,
  outdate: PropTypes.string
};

export default withStyles(styles)(VaccineCard);
