import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/orders';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            postCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid: true,
            },
        },
        isFormValid: false,
    }

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

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let label in this.state.orderForm) {
            formData[label] = this.state.orderForm[label].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            user: this.props.userId,
        };
        console.log(order);
        this.props.onOrderBurger(order);
    }

    inputChangeHandler = (event, label) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedOrderFormElement = {
            ...updatedOrderForm[label]
        };
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = this.checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation);
        updatedOrderFormElement.touched = true;
        updatedOrderForm[label] = updatedOrderFormElement;

        let isFormValid = true;
        for(let label in updatedOrderForm) {
            isFormValid = updatedOrderForm[label].valid && isFormValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            isFormValid: isFormValid
        });
    }

    render() {
        const inputs = Object.keys(this.state.orderForm).map(label => {
                return <Input
                            key={label}
                            changed={(event) => this.inputChangeHandler(event, label)}
                            invalid={!this.state.orderForm[label].valid}
                            elementType={this.state.orderForm[label].elementType}
                            elementConfig={this.state.orderForm[label].elementConfig}
                            shouldValidate={this.state.orderForm[label].validation}
                            touched={this.state.orderForm[label].touched}
                            value={this.state.orderForm[label].value} />
            })

        let form = (
            <form onSubmit={this.orderHandler}>
                {inputs}
                <Button btnType='Success' clicked={this.orderHandler} disabled={!this.state.isFormValid}>
                    ORDER
                </Button>
            </form>
        );
        if(this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.orders.loading,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (newOrder) => dispatch(orderActions.purchaseBurgerInit(newOrder)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));