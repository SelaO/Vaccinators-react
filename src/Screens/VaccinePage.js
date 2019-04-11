import React, { Component } from "react";
import PropTypes from "prop-types";
import VaccineCard from "../components/VaccineCard";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  VaccineCardHeader: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridGap: "5px",
    marginBottom: "5px"
  }
};

class VaccinePage extends Component {
  static propTypes = {};

  render() {
    const arr = [
      {
        name: "vaccine A",
        date: "10.2.2019",
        location: "Tel-aviv",
        md: "Roy Ashkenezi",
        outdate: "10.2.2019"
      },
      {
        name: "vaccine B",
        date: "10.2.2019",
        location: "Tel-aviv",
        md: "Roy Ashkenezi",
        outdate: "10.2.2019"
      }
    ];

    return (
      <div>
        <div style={styles.VaccineCardHeader}>
          <div>name</div>
          <div>date</div>
          <div>location</div>
          <div>md</div>
          <div>outdate</div>
        </div>
        {arr.map(e => (
          <VaccineCard {...e} />
        ))}
      </div>
    );
  }
}

export default VaccinePage;
