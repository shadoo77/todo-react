import React, { Component } from 'react';
import { Button, TextField, Modal } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Valid from '../validation/validate.js';
import axios from 'axios';
import history from '../../history';

const initialInputs = {
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    isFound: 'hidden',
    modalOpen: false
};

class LoginForm extends Component {
    constructor() {
        super();
        this.state = initialInputs;
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isValid = () => {
        const errorObject = Valid(this.state);
        if(errorObject.emailError || errorObject.passwordError) {
            this.setState({...errorObject});
            return false;
        }
        return true;
    }

    handleSubmit = e => {
        e.preventDefault();
        const isValid = this.isValid();
        if(isValid) {
            const userInfo = {
                email: this.state.email,
                password: this.state.password
            };
            axios.post('/api/login', userInfo)
                .then(res => {
                    this.setState({isFound: 'hidden'});
                    localStorage.setItem('my-jwt', res.data.token);
                    history.push('/');
                })
                .catch(err => {
                    console.log('login error ::: ', err.response);
                    this.setState({isFound: 'visible'});
                });
            const initValues = {...initialInputs, modalOpen: true};
            this.setState(initValues);
        }
    }


    render() {
        const {email, password, emailError, passwordError} = this.state;
        return ( 
            <form className="login-form" onSubmit={this.handleSubmit}>
                <TextField
                    required
                    error={emailError ? true : false}
                    helperText={emailError ? emailError : null}
                    name="email"
                    id="email_input"
                    label="E-mail Address"
                    value={email}
                    className="input_class"
                    onChange={this.handleChange}
                    margin="dense"
                /><br />
                <TextField
                    error={passwordError ? true : false}
                    helperText={passwordError ? passwordError : null}
                    name="password"
                    required
                    id="password_input"
                    label="Password"
                    value={password}
                    className="input_class"
                    type="password"
                    onChange={this.handleChange}
                    margin="dense"
                /><br /><br />
                <Button variant="contained" type="submit" color="primary" size="large">Sign Up</Button>
                <p style={{marginTop: "15px"}}>You don't have an account !? <Link to="/signup">Sign up here</Link></p>
                <div style={{visibility: this.state.isFound}}>This user is not found!</div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.modalOpen}
                    onClose={this.handleModalClose}
                >
                    <div className="modal-login">
                        <h2>Welcome again! </h2>
                    </div>
                </Modal>
            </form>
         );
    }
}
 
export default LoginForm;
