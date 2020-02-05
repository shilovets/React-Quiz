import React, {Component} from "react";

import "./Auth.scss";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {validate, validateForm} from "../../form/formFramework";

class Auth extends Component {

    state = {
        isFormValid: false,
        formControl: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Enter correct email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Enter correct password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    };

    loginHandler = () => {

    };

    signUpHandler = () => {

    };

    submitHandler = event => {
        event.preventDefault();
    };

    onChangeHandler = (event, controlName) => {
        let formControl = {...this.state.formControl},
            control = formControl[controlName];

        control.value = event.target.value;
        control.touched = true;
        control.valid = validate(control.value, control.validation);

        formControl[controlName] = control;

        this.setState({
            formControl,
            isFormValid: validateForm(formControl)
        })
    };

    renderInputs() {
        return Object.keys(this.state.formControl).map((controlName, index) => {
            const control = this.state.formControl[controlName];
            return (
                <Input
                    key={controlName + index}
                    value={control.value}
                    type={control.type}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    touched={control.touched}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    onChange={event => {
                        this.onChangeHandler(event, controlName)
                    }}
                />
            )
        })
    }

    render() {

        return (
            <div className='Auth'>
                <div>
                    <h1>Authorization</h1>

                    <form onSubmit={this.submitHandler} className='Auth__form'>

                        {this.renderInputs()}

                        <Button
                            type="successBtn"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Login
                        </Button>
                        <Button
                            type="primaryBtn"
                            onClick={this.signUpHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Sign up
                        </Button>
                    </form>
                </div>
            </div>
        )
    };
};

export default Auth;