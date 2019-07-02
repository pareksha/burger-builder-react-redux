import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../store/actions/index';

class Orders extends Component {

    componentWillMount() {
        this.props.onInitOrders();
    }

    render() {
        console.log('loading', this.props.loading);
        console.log('orders', this.props.orders);
        let orders = <Spinner />;
        if(!this.props.loading) {
            orders = this.props.orders.map(order => {
                return <Order key={order.id} ingredients={order.ingredients} price={+order.price}/>
            });
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitOrders: () => dispatch(orderActions.ordersInit()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));