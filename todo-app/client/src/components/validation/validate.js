export default (data) => {
    const nameRegex = /^[a-zA-Z\-]+$/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const usernameRegex = /^[a-zA-Z0-9.\-_$@*!]{3,30}$/;
    const passwordRegex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,30})$/;
    //const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    //const meduimPasswordRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    
    const checkFormType = Object.keys(data).length;

    if(checkFormType > 7) {
        const errorObject = {
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            userNameError: '',
            passwordError: '',
            passwordConfirmError: ''
        };
    
        const validFirstName = data.firstName.match(nameRegex);
        const validLastName = data.lastName.match(nameRegex);
        const validEmail = data.email.match(emailRegex);
        const validUsername = data.userName.match(usernameRegex);
        const validPassword = data.password.match(passwordRegex);
        if(validFirstName == null) {
            errorObject.firstNameError = 'Invalid first name!';
        }
        if(validLastName == null) {
            errorObject.lastNameError = 'Invalid last name!';
        }
        if(validEmail == null) {
            errorObject.emailError = 'Invalid email !';
        }
        if(validUsername == null) {
            errorObject.userNameError = 'Invalid username !';
        }
        if(validPassword == null) {
            errorObject.passwordError = 'Invalid password !  minimum 8 characters with at least one number';
        }
        if(data.password !== data.passwordConfirm) {
            errorObject.passwordConfirmError = "confirm password doesn't match with password !";
        }
        return errorObject;
    } else {
        const errorObject = {
            emailError: '',
            userNameError: '',
            passwordError: '',
        };
        const validEmail = data.email.match(emailRegex);
        //const validPassword = data.password.match(meduimPasswordRegex);
    
        if(validEmail == null) {
            errorObject.emailError = 'Invalid email !';
        }
        /*if(validPassword == null) {
            errorObject.passwordError = 'Invalid password !  minimum 8 characters with at least one number';
        }*/
        return errorObject;
    }

}