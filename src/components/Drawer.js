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

import MainPage from "../Screens/MainPage";
import VaccinePage from "../Screens/VaccinePage";
import WorldPage from "../Screens/WorldPage";

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
    MAIN: "Main",
    VACCINE_LIST: "Vaccine List",
    WORLD_LIST: "World List"
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
                    <Toolbar disableGutters={!open}>
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
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === "ltr" ? (
                                <ChevronLeftIcon />
                            ) : (
                                    <ChevronRightIcon />
                                )}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem
                            button
                            onClick={() =>
                                this.setState({
                                    screenToRender: SCREENS.MAIN,
                                    open: false
                                })
                            }
                        >
                            <ListItemText primary="Main" />
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
                            <ListItemText primary="Vaccine List" />
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
                            <ListItemText primary={"World List"} />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() =>
                                this.setState({
                                    open: false
                                })
                            }
                        >
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
                        <MainPage />
                    ) : this.state.screenToRender === SCREENS.VACCINE_LIST ? (
                        <VaccinePage />
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
