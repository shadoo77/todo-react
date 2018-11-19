import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            checked: false
         };
    }

    handleChange = (e, name) => {//
        this.setState({
            [name]: e.target.checked
        });
        this.props.changeCheckedTask();
    }

    componentDidMount() {
        if(this.props.checked === 1) this.setState({checked: true});
        else this.setState({checked: false});
    }

    render() { 
        return ( 
            <Checkbox
                checked={this.state.checked}
                onChange={(e) => this.handleChange(e, 'checked')}
                value="checkedB"
                color="primary"
            />
         );
    }
}
 
export default CheckBox;