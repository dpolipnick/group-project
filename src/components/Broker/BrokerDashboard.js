import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AddClient from './AddClient';


import ClientTable from './ClientTable';
import QuoteTable from './QuoteTable';

//  This was test code to test the post that creates a new quote
import axios from 'axios';
import { call } from 'redux-saga/effects';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: 50,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#1a3d50',
      },
    secondary: {
      main: '#efbf42',
    },
  },
});

class BrokerDashboard extends Component {
    state = {
      value: 0,
    };

    // This was test code to test the post that creates a new quote
    componentDidMount = () => {
      this.props.dispatch( { type: 'FETCH_PROVIDERS' } );

    };





    handleChange = (event, value) => {
      this.setState({ value });
    };

    render() {
      const { classes } = this.props;
      const { value } = this.state;
      
    return (
      <MuiThemeProvider theme={theme}>
        <NoSsr>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs fullWidth value={value} onChange={this.handleChange}>
                <LinkTab label="Clients" href="page1" />
                <LinkTab label="Quotes" href="page2" />
              </Tabs>
            </AppBar>
            {value === 0 && <TabContainer><ClientTable/></TabContainer>}
            {value === 1 && <TabContainer><QuoteTable/></TabContainer>}
          </div>
        </NoSsr>
        <AddClient/>
      </MuiThemeProvider>
    );
  }
}


const mapStateToProps = reduxState => {
  return reduxState
};

BrokerDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(BrokerDashboard));