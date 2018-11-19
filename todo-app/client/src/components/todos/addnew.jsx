import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';

class AddNewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
            itemError: ''
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    inputValidate() {
        const inputRegex = /^[a-zA-Z0-9 _.\-_'$@*!]{3,250}$/;
        const validNewItem = this.state.item.match(inputRegex);
        if(validNewItem == null) {
            this.setState({ itemError: 'Invalid text, it must be min 3 character , max 250 character' });
            return false;
        }
        return true;
    }

    handleSubmit = e => {
        e.preventDefault();
        const isValid = this.inputValidate();
        if(isValid) {
            this.props.addNewElement(this.state.item);
            const initialValue = {
                item: '',
                itemError: ''
            };
            this.setState(initialValue);
        }
    }

    render() { 
        return ( 
            <form onSubmit={this.handleSubmit}>
                <TextField
                    style={{width: '50%'}}
                    required
                    name="item"
                    id="new_item"
                    label="Add a new todo item"
                    className="input_class"
                    margin="dense"
                    error={this.state.itemError ? true : false}
                    helperText={this.state.itemError ? this.state.itemError : null}
                    value={this.state.item}
                    onChange={this.handleChange}
                /><br /><br />
                <Button variant="contained" type="submit" color="primary" size="large">Add</Button>
            </form>
         );
    }
}
 
export default AddNewForm;