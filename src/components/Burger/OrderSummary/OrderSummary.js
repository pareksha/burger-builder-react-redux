import React, {Component} from 'react';

import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    // This could be a functional component
    componentDidUpdate() {
        console.log('Order summary update!!');
    }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map((ingName) => {
                return (
                    <li key={ingName}>
                        <span style={{textTransform: "capitalize"}}>{ingName}</span>: {this.props.ingredients[ingName]}
                    </li>
                )
            });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.cancelPurchase}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.continuePurchase}>CONTINUE</Button>
            </Aux>
        );
    };
};

export default OrderSummary;