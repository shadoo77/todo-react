import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header';

import Home from './pages/home';
import SignUp from './pages/signup';
import LogIn from './pages/login';
import WrongPage from './pages/notexist';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { Theme1, Theme2 } from './components/theme';

import Auth from './components/auth';



class App extends Component {
  constructor() {
    super();
    this.state = {
      theme: Theme1
    }

  }

  SwitchTheme = (layout) => {
    console.log('LayOut is ::: ', layout);
    layout === 'theme1' ? this.setState({theme: Theme1}) : this.setState({theme: Theme2});
  }

  render() {
    return (
      <div className="App">
      <MuiThemeProvider theme={this.state.theme}>            
              <Header SwitchTheme={this.SwitchTheme} />
              <Switch>
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={LogIn} />
                <Auth><Route path="/" component={Home} exact /></Auth>
                <Route component={WrongPage} />
              </Switch>
      </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
