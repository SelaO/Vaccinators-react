import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Demo from "./Demo";

import Airplanemode_active from '@material-ui/icons/FlightTakeoff'
import ListIcon from '@material-ui/icons/List'
import Done from '@material-ui/icons/Done'
import ExitToApp from '@material-ui/icons/ExitToApp'

import UserDetailsPage from "../Screens/UserDetailsPage"
import MainPage from "../Screens/MainPage";
import VaccinesPage from "../Screens/VaccinesPage"
import WorldPage from "../Screens/WorldPage";
import VaccineList from "./VaccineList";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
});

const SCREENS = {
    MAIN: "MAIN",
    VACCINE_LIST: "VACCINE_LIST",
    WORLD_LIST: "WORLD_LIST"
};

const SCREENS_TITLES = {
    MAIN: "My Personal Details",
    VACCINE_LIST: "My Vaccine List",
    WORLD_LIST: "Vaccine Global Map"
};

class PersistentDrawerLeft extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            screenToRender: SCREENS.MAIN,
            open: false
        };
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, theme } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar disableGutters={!open} style={{ backgroundColor: '#FEFFA0', color: 'black' }}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            {SCREENS_TITLES[this.state.screenToRender]}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader} style={{ backgroundColor: '#FEFFA0', color: 'black' }}>
                        <IconButton onClick={this.handleDrawerClose} style={{fontWeight: 'bold', fontSize: 'large'}}>
                        Vaccinators
                            {theme.direction === "ltr" ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                                )}
                        </IconButton>
                    </div>
                    <Divider />
                    <List style={{ backgroundColor: '#FEFFA0', color: 'black', height: '100%' }}>
                        <ListItem
                            button
                            onClick={() =>
                                this.setState({
                                    screenToRender: SCREENS.MAIN,
                                    open: false
                                })
                            }
                        >
                            <Done />
                            <ListItemText primary={SCREENS_TITLES.MAIN} />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() =>
                                this.setState({
                                    screenToRender: SCREENS.VACCINE_LIST,
                                    open: false
                                })
                            }
                        >
                            <ListIcon />
                            <ListItemText primary={SCREENS_TITLES.VACCINE_LIST} />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() =>
                                this.setState({
                                    screenToRender: SCREENS.WORLD_LIST,
                                    open: false
                                })
                            }
                        >
                            <Airplanemode_active />
                            <ListItemText primary={SCREENS_TITLES.WORLD_LIST} />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() =>
                                this.setState({
                                    open: false
                                })
                            }
                        >
                        <ExitToApp/>
                            <ListItemText primary={"Logout"} />
                        </ListItem>
                    </List>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open
                    })}
                >
                    <div className={classes.drawerHeader} />
                    {this.state.screenToRender === SCREENS.MAIN ? (
                        <UserDetailsPage />
                    ) : this.state.screenToRender === SCREENS.VACCINE_LIST ? (
                        <VaccinesPage />
                    ) : this.state.screenToRender === SCREENS.WORLD_LIST ? (
                        <WorldPage />
                    ) : null}
                </main>
            </div>
        );
    }
}

PersistentDrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
