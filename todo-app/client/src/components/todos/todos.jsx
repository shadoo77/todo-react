import React, {Component} from 'react';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import history from '../../history';
import {Grid, Paper} from '@material-ui/core';
import Element from './element';
import AddNewForm from './addnew';

class Todos extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        const jwt = localStorage.getItem('my-jwt');
        axios.get(`/api/todos`, {headers: {Authorization: `Bearer ${jwt}`}})
            .then(res => {
                //console.log(res.data);
                this.setState({
                    isLoaded: true,
                    items: res.data     
                });
            }).catch(err => {
                localStorage.removeItem('my-jwt');
                console.log('auth error ::: ', err.response);
                history.push('/login');
            });
    }

    addNewElement = (item) => {
        const newItem = {
            id: uuidv4(),
            task: item,
            done: false
        };
        const jwt = localStorage.getItem('my-jwt');
        const config = {headers: {Authorization: `Bearer ${jwt}`}};
        axios.post('/api/todos/add', newItem, config)
                .then(res => {
                    console.log('item added!', res.data);
                })
                .catch(err => {
                    console.log('add error ::: ', err.response);
                });
        const items = [...this.state.items, newItem];
        this.setState({items});
    }

    deleteElement = (itemId) => {
        const jwt = localStorage.getItem('my-jwt');
        const config = {headers: {Authorization: `Bearer ${jwt}`}};
        console.log('wil be deleted :: ', itemId);
        axios.delete(`/api/todos/delete/${itemId}`, config)
                .then(res => {
                    console.log('item deleted!', res.data);
                })
                .catch(err => {
                    console.log('delete error ::: ', err.response);
                });
        const items = this.state.items.filter(item => item.id !== itemId);
        this.setState({items});
    }

    changeDoneTask = (itemId) => {
        const jwt = localStorage.getItem('my-jwt');
        const config = {headers: {Authorization: `Bearer ${jwt}`}};
        const item = this.state.items.filter(item => item.id === itemId);
        item[0].done = !item[0].done;
        const newItem = {
            task: item[0].task,
            done: item[0].done
        };
        axios.put(`/api/todos/update/${itemId}`, newItem, config)
                .then(res => {
                    console.log('item updated!', res.data);
                })
                .catch(err => {
                    console.log('update error ::: ', err.response);
                });
    }

    changeTaskText = (itemId, inputTask, inputDone) => {
        const jwt = localStorage.getItem('my-jwt');
        const config = {headers: {Authorization: `Bearer ${jwt}`}};
        const newItem = {
            task: inputTask,
            done: inputDone === 1 ? true : false
        };
        console.log('inputDone :: ', inputDone);
        axios.put(`/api/todos/update/${itemId}`, newItem, config)
                .then(res => {
                    console.log('item updated!', res.data);
                })
                .catch(err => {
                    console.log('update error ::: ', err.response);
                });
    }

    render() {
        if(!this.state.isLoaded) return <div>Loading ...</div>;
        else {
            return ( 
                <div>
                    <AddNewForm addNewElement={this.addNewElement} /><br />
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={8}>
                            {this.showTodoLists()}
                        </Grid>
                    </Grid>
                  
                </div>
             );
        }
    }
    showTodoLists() {
        const items = this.state.items;
        if(!Array.isArray(items)) return <Paper>{items[Object.keys(items)[0]]}</Paper>;
        else if(Array.isArray(items)) {
            return items.map((el, index) => <Element key={index} 
                                            task={el.task} done={el.done}
                                            id={el.id} changeDoneTask={this.changeDoneTask}
                                            changeTaskText={this.changeTaskText}
                                            deleteElement={this.deleteElement} />);
        }
    }
}
 
export default Todos;