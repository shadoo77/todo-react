import React, { Component } from 'react';
import Todos from '../components/todos/todos';

class Home extends Component {
    render() { 
        return ( 
            <React.Fragment>
                <Todos />
            </React.Fragment>
         );
    }
}
 
export default Home;