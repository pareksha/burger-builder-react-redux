import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';
import * as authActions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'email',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        },
        isSignUp: true,
    };

    checkValidity(value, rules={}) {
        let isValid = true;

        if(rules.required && isValid) {
            isValid = value.trim() !== '';
        };

        if(rules.minLength && isValid) {
            isValid = value.length >= rules.minLength;
        }

        return isValid;
    }

    inputChangeHandler = (event, control) => {
        const updatedControls = {
            ...this.state.controls,
            [control]: {
                ...this.state.controls[control],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[control].validation),
                touched: true,
            },
        };
        this.setState({
            controls: updatedControls,
        });
    };

    onFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.isSignUp);
        this.props.onAuthentication(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignUp,
        );
    };

    switchSignUp = () => {
        return this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp,
            };
        });
    };

    render() {
        const inputs = Object.keys(this.state.controls).map(control => {
            return <Input
                        key={control}
                        changed={(event) => this.inputChangeHandler(event, control)}
                        invalid={!this.state.controls[control].valid}
                        elementType={this.state.controls[control].elementType}
                        elementConfig={this.state.controls[control].elementConfig}
                        shouldValidate={this.state.controls[control].validation}
                        touched={this.state.controls[control].touched}
                        value={this.state.controls[control].value} />
        })

        let form = (
            <form onSubmit={this.onFormSubmit}>
                {inputs}
                <Button btnType='Success'>
                    SUBMIT
                </Button>
            </form>
        );
        if(this.props.loading) {
            form = <Spinner />;
        };

        let errorMsg = null;
        if(this.props.error) {
            errorMsg = this.props.error.message;
        };

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            let redirectUrl = "/";
            if(this.props.isBuilding) {
                redirectUrl = "/checkout";
            }
            authRedirect = <Redirect to={redirectUrl} />;
        };

        return (
            <div className={styles.Auth}>
                {authRedirect}
                {errorMsg}
                {form}
                <Button clicked={this.switchSignUp} btnType='Danger'>
                    SWITCH TO {this.state.isSignUp ? 'SIGN IN': 'SIGN UP'}
                </Button>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        isBuilding: state.burgerBuilder.building,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthentication: (email, password, isSignUp) => dispatch(authActions.authInit(email, password, isSignUp)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));