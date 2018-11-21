import React, { Component } from 'react';
import {Paper, TextField} from '@material-ui/core';
import {Clear, Create, DeleteForever, Done} from '@material-ui/icons';
import CheckBox from './checkbox';

class Element extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: this.props.task,
            done: this.props.done,
            taskError: '',
            editMode: false,
            initialTask: this.props.task
        };
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    enableEditMode = () => {
        const temp = this.state.task;
        this.setState({
            editMode: !this.state.editMode,
            initialTask: temp
        });
    }

    checkedElements() {
        return this.state.done ? "el-description checked" : "el-description";
    }

    updateCheckedState = (id) => {
        this.props.changeDoneTask(id);
        this.setState({done: !this.state.done});
    }

    inputValidate() {
        const inputRegex = /^[a-zA-Z0-9 _.\-_'$@*!]{3,250}$/;
        const validNewItem = this.state.task.match(inputRegex);
        if(validNewItem == null) {
            this.setState({ taskError: 'Invalid text, it must be min 3 character , max 250 character' });
            return false;
        }
        return true;
    }

    handleSubmit = e => {
        e.preventDefault();
        const isValid = this.inputValidate();
        if(isValid) {
            console.log('submit is ok now!');
            this.props.changeTaskText(this.props.id, this.state.task, this.state.done);
            this.setState({
                taskError: '',
                editMode: !this.state.editMode
            });
        }
    }

    handleCancel = () => {
        this.setState({
            task: this.state.initialTask,
            editMode: !this.state.editMode
        });
     }

    render() {
        const {editMode} = this.state;
        return ( 
            <Paper className="single-element" >
            {!editMode ? this.normalModeItem() : this.editModeItem()}
            </Paper>
         );
    }

    normalModeItem() {
        const {id, deleteElement} = this.props;
        return <React.Fragment>
                    <div className="checkbox-edit"><CheckBox checked={this.state.done} changeCheckedTask={() => this.updateCheckedState(id)} /></div>
                    <div className={this.checkedElements()}>{this.state.task}</div>
                    <div>
                        <span className="popup-container">
                            <Create color="primary" className="el-icon" onClick={this.enableEditMode} />
                            <span className="popup-message">Click to modify</span>
                        </span>
                        <span className="popup-container">
                            <DeleteForever color="primary" className="el-icon" onClick={() => deleteElement(id)} />
                            <span className="popup-message">Click to delete</span>
                        </span>
                    </div>
                </React.Fragment>;
    }

    editModeItem() {
        return <form onSubmit={this.handleSubmit}>
                    <TextField
                        style={{width: '50%'}}
                        required
                        name="task"
                        id="new_item_update"
                        className="input_class"
                        margin="dense"
                        error={this.state.taskError ? true : false}
                        helperText={this.state.taskError ? this.state.taskError : null}
                        defaultValue={this.state.task}
                        onChange={this.handleChange}
                    />
                    <div>
                        <span className="popup-container">
                            <Clear style={{color: 'red'}} className="el-icon" onClick={this.handleCancel} />
                            <span className="popup-message">Click to confirm</span>
                        </span>
                        <span className="popup-container">
                            <Done style={{color: 'green'}} className="el-icon" onClick={this.handleSubmit} />
                            <span className="popup-message">Click to cancel</span>
                        </span>
                    </div>
                </form>
    }
}
 
export default Element;