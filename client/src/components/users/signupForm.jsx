import React, { Component } from 'react';
import { Button, TextField, Modal } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Valid from '../validation/validate.js';
import axios from 'axios';
import history from '../../history';

const initialInputs = {
    firstName: '',
    firstNameError: '',
    lastName: '',
    lastNameError: '',
    email: '',
    emailError: '',
    userName: '',
    userNameError: '',
    password: '',
    passwordError: '',
    passwordConfirm: '',
    passwordConfirmError: '',
    isFound: 'hidden',
    modalOpen: false
};

class SignUpForm extends Component {
    constructor() {
        super();
        this.state = initialInputs;
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    turnWelcomMsg() {
        setInterval(() => {
            this.setState({isFound: 'hidden', modalOpen: true});
        }, 500);
    }

    isValid = () => {
        const errorObject = Valid(this.state);
        if(errorObject.firstNameError || errorObject.lastNameError
         || errorObject.emailError || errorObject.userNameError 
         || errorObject.passwordError || errorObject.passwordConfirmError) {
            this.setState({...errorObject});
            return false;
        }
        return true;
    }

    handleSubmit = e => {
        e.preventDefault();
        const isValid = this.isValid();
        if(isValid) {
            const { firstName, lastName, userName, email, password } = this.state;
            const userInfo = {firstName, lastName, userName, email, password};
            axios.post('/api/signup', userInfo)
                .then(res => {
                    this.setState({isFound: 'hidden', modalOpen: true});
                    //history.push('/login');
                })
                .catch(err => {
                    console.log('signup error ::: ', err.response);
                    this.setState({isFound: 'visible'});
                });
            this.setState(initialInputs);
        }
    }

    showModal() {
        if(this.state.modalOpen) {
            setTimeout(() => {
                history.push('/login');
            }, 3000);
            return <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.modalOpen}
                        onClose={this.handleModalClose}
                    >
                        <div className="modal-login">
                            <h2>Welcome {this.state.firstName}, login your account pls! </h2>
                        </div>
                    </Modal>;
        }
    }

    render() {
        const {
            firstName, lastName, email, userName, password, passwordConfirm,
            firstNameError, lastNameError, emailError, userNameError, passwordError, passwordConfirmError} = this.state;
        return ( 
            <form className="signup-form" onSubmit={this.handleSubmit}>
                <TextField
                    error={firstNameError ? true : false}
                    helperText={firstNameError ? firstNameError : null}
                    value={firstName}
                    name="firstName"
                    required
                    id="first_name_input"
                    label="First Name"
                    className="input_class"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    margin="dense"
                /><br />
                <TextField
                    error={lastNameError ? true : false}
                    helperText={lastNameError ? lastNameError : null}
                    value={lastName}
                    name="lastName"
                    required
                    id="last_name_input"
                    label="Last Name"
                    className="input_class"
                    onChange={this.handleChange}
                    margin="dense"
                /><br />
                <TextField
                    error={emailError ? true : false}
                    helperText={emailError ? emailError : null}
                    name="email"
                    required
                    id="email_input"
                    label="E-mail Address"
                    value={email}
                    className="input_class"
                    onChange={this.handleChange}
                    margin="dense"
                /><br />
                <TextField
                    error={userNameError ? true : false}
                    helperText={userNameError ? userNameError : null}
                    name="userName"
                    required
                    id="username_input"
                    label="Username"
                    value={userName}
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
                /><br />
                <TextField
                    error={passwordConfirmError ? true : false}
                    helperText={passwordConfirmError ? passwordConfirmError : null}
                    name="passwordConfirm"
                    required
                    id="password_confirm_input"
                    label="Password confirm"
                    value={passwordConfirm}
                    className="input_class"
                    type="password"
                    onChange={this.handleChange}
                    margin="dense"
                /><br /><br />
                <Button variant="contained" type="submit" color="primary" size="large">Sign Up</Button>
                <p style={{marginTop: "15px"}}>Do you have an account !? <Link to="/login">Log in here</Link></p>

                <div className="usernotfound" style={{visibility: this.state.isFound}}>This user is found! try another username and email</div>
                {this.showModal()}
            </form>
         );
    }
}
 
export default SignUpForm;