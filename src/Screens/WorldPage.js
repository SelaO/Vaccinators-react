import React, { Component } from "react"
import PropTypes from 'prop-types'
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps"
import Button from '@material-ui/core/Button';
import { scaleLinear } from "d3-scale"
import geographyObject from "./world-50m.json"
import suggestions from './countries.json';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import VaccineList from "../components/VaccineList.js";
import { getNeededVaccinesByCountry } from '../logic/backend'

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}


function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

const colorScale = scaleLinear()
    .domain([0, 100000000, 1338612970]) // Max is based on China
    .range(["#FFF176", "#FFC107", "#E65100"])

const wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
}

const selectStyles = {
    input: base => ({
        ...base,
        color: 'white',
        '& input': {
            font: 'inherit',
        },
    }),
};

class WorldPage extends Component {
    static propTypes = {
    }

    constructor(props) {
        super(props)

        this.state = {
            zoom: 1,
            selectedCountryAlpha3: null,
            vaccines: [],
        }

        this.handleZoomIn = this.handleZoomIn.bind(this)
        this.handleZoomOut = this.handleZoomOut.bind(this)
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = name => value => {
        this.setState({
            [name]: value,
            selectedCountryAlpha3: value.alpha3.toUpperCase(),
            vaccines: getNeededVaccinesByCountry("1", value)
        });


    };

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
        this.setState({
            selectedCountryAlpha3: geography.id,
            vaccines: getNeededVaccinesByCountry("1", geography.id) // this is alpha3 and not country 
        })
    }

    geographyRenderer(geography, projection, i, isSelected) {
        return (<Geography
            key={`geography-${i}`}
            cacheId={`geography-${i}`}
            geography={geography}
            projection={projection}
            onClick={this.handleClick}
            style={{
                default: {
                    fill: isSelected ? 'yellow' : "#ECEFF1",
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: isSelected ? 'red' : "none",
                },
                hover: {
                    fill: "lightYellow",
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none",
                },
                pressed: {
                    fill: "lightgoldenrodyellow",
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none",
                },
            }}
        />)
    }

    render() {
        const { classes } = this.props;

        return (
            <div style={wrapperStyles}>
                <Button style={{color: '#888888'}} onClick={this.handleZoomIn}>{"Zoom in"}</Button>
                <Button style={{color: '#888888'}} onClick={this.handleZoomOut}>{"Zoom out"}</Button>
                <hr />
                <ComposableMap style={{ width: "100%" }}>
                    <ZoomableGroup zoom={this.state.zoom}>
                        <Geographies geography={geographyObject} disableOptimization>
                            {
                                (geographies, projection) =>
                                    geographies.map((geography, i) => this.geographyRenderer(geography, projection, i, geography.id === this.state.selectedCountryAlpha3)
                                    )}
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
                <Select
                    classes={classes}
                    styles={selectStyles}
                    options={suggestions}
                    components={components}
                    value={this.state.single}
                    onChange={this.handleChange('single')}
                    placeholder="Search a country"
                    isClearable
                />
                {this.state.selectedCountryAlpha3 && suggestions.find(e => e.alpha3.toUpperCase() === this.state.selectedCountryAlpha3) ?
                    <React.Fragment>
                        <div style={{color: '#888888'}}>
                            <h2>Needed vaccines for {suggestions.find(e => e.alpha3.toUpperCase() === this.state.selectedCountryAlpha3).label}</h2>
                        </div>
                        <VaccineList rows={this.state.vaccines} />
                    </React.Fragment> : <h2 style={{color: '#888888'}}>No necessary vaccines found</h2>}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: false })(WorldPage);
