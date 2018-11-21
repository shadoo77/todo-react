import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import history from '../history';

class Authenticate extends Component {
    constructor(props) {
        super(props);
        this.state ={
            user: undefined
        };
    }

    getToken = () => {
        return localStorage.getItem('my-jwt');
    }

    componentDidMount() {
        const jwt = this.getToken();
        if(!jwt) {
            history.push('/login');
        }else {
            history.push('/');
        }
    }

    render() { 
        return ( 
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
         );
    }
}
 
export default withRouter(Authenticate);