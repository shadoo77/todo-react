import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AppBar, Toolbar, Typography, Button, withStyles, Tabs, Tab } from '@material-ui/core';

import ToggleMenu from './togglemenu';
import history from '../history';

const styles = {
  rootNav: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    marginTop: 15
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  logoutButton: {
    flex: 1,
    maxWidth: 50,
    float: 'right',
    marginRight: 20,
  }
};


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

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'theme1'
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
    console.log('Value is ::: ', value);
    if(value === 'theme1' || value === 'theme2') this.props.SwitchTheme(value);
  };

  changeButton1Style() {
    const style = {backgroundColor: '#009688'};
    return this.state.value === 'theme1' ? null : style;
  }

  changeButton2Style() {
    const style = {backgroundColor: '#D32F2F'};
    return this.state.value === 'theme1' ? style : null;
  }
  
  logOut() {
    localStorage.removeItem('my-jwt');
    history.push('/login');
  }

    render() {
      const { classes } = this.props;
      const { value } = this.state;
      const jwt = localStorage.getItem('my-jwt');
        return ( 
          <React.Fragment>
        
        
            <div className={classes.rootNav}> 
                   
              <AppBar position="static">
              <Typography variant="h3" color="inherit" className={classes.grow}>
                    Todo Application
                  </Typography>  
                <Toolbar>
                  <ToggleMenu />
                  
                    <Tabs value={value} onChange={this.handleChange} id="menubar">
                      <Tab label="Main" component={Button} value="theme1" style={this.changeButton1Style()}/>
                      <Tab label="Second" component={Button} value="theme2" style={this.changeButton2Style()} />
                    </Tabs>
                    
                    <Typography variant="h5" className={classes.grow} />
                  { jwt ? 
                  <Button color="inherit" size="medium" 
                    className={classes.logoutButton}
                    onClick={this.logOut}>
                    Logout
                  </Button> : null
                  }
                </Toolbar>
              </AppBar>
            </div>
            
          </React.Fragment>    
         );
    }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);