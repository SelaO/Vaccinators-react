import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps"

import { scaleLinear } from "d3-scale"
import geographyObject from "./world-50m.json"

const colorScale = scaleLinear()
  .domain([0, 100000000, 1338612970]) // Max is based on China
  .range(["#FFF176", "#FFC107", "#E65100"])

const wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
  }

  const include = [
    "ARG", "BOL", "BRA", "CHL", "COL", "ECU",
    "GUY", "PRY", "PER", "SUR", "URY", "VEN",
  ]

export default class WorldPage extends Component {
    static propTypes = {
        prop: PropTypes
    }

    constructor(props) {
        super(props)

        this.state = {
            zoom: 1,
            selectedCountryAlpha3: null,
        }

        this.handleZoomIn = this.handleZoomIn.bind(this)
        this.handleZoomOut = this.handleZoomOut.bind(this)
    }

    handleZoomIn() {
        this.setState({
            zoom: this.state.zoom * 2,
        })
    }
    
    handleZoomOut() {
        this.setState({
            zoom: this.state.zoom / 2,
        })
    }

    handleClick(geography, evt) {
        console.log("Geography data: ", geography)
      }

      geographyRenderer(geography, projection, i) {
        return (<Geography
            key={ `geography-${i}` }
            cacheId={ `geography-${i}` }
            geography={ geography }
            projection={ projection }
            onClick={this.handleClick}
            style={{
              default: {
                fill: "#ECEFF1",
                stroke: "#607D8B",
                strokeWidth: 0.75,
                outline: "none",
              },
              hover: {
                fill: "#607D8B",
                stroke: "#607D8B",
                strokeWidth: 0.75,
                outline: "none",
              },
              pressed: {
                fill: "#FF5722",
                stroke: "#607D8B",
                strokeWidth: 0.75,
                outline: "none",
              },
            }}
          />)
      }
    
    render() {
        return (
            <div style={wrapperStyles}>
        <button onClick={ this.handleZoomIn }>{ "Zoom in" }</button>
        <button onClick={ this.handleZoomOut }>{ "Zoom out" }</button>
        <hr />
        <ComposableMap style={{ width: "100%" }}>
          <ZoomableGroup zoom={ this.state.zoom }>
            <Geographies geography={ geographyObject } disableOptimization>
              {
                  (geographies, projection) => this.state.selectedCountryAlpha3 ? 
                  this.geographyRenderer(geographies.find(e => e.id === this.state.selectedCountryAlpha3), projection) : 
                  geographies.map((geography, i) => this.geographyRenderer(geography, projection, i)
 
              )}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
            </div>
        )
    }
}

