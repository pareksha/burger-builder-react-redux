import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchasedInit = () => {
    return {
        type: actionTypes.PURCHASED_INIT,
    };
};

export const purchaseBurgerSuccess = (id, newOrder) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        newOrder: newOrder,
        orderId: id,
    };
};

export const purchaseBurgerFailed = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error,
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};

export const purchaseBurgerInit = (order) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', order)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, order));
        })
        .catch(error => {
            console.log(error);
            dispatch(purchaseBurgerFailed(error));
        });
    };
};

export const ordersInitStart = () => {
    return {
        type: actionTypes.ORDERS_INIT_START,
    };
};

export const ordersInitSuccess = (orders) => {
    return {
        type: actionTypes.ORDERS_INIT_SUCCESS,
        orders: orders,
    };
};

export const ordersInitFailed = (error) => {
    return {
        type: actionTypes.ORDERS_INIT_FAILED,
        error: error,
    };
};

export const ordersInit = () => {
    return dispatch => {
        dispatch(ordersInitStart());
        axios.get('/orders.json')
        .then(response => {
            const orders = [];
            for(let order in response.data) {
                orders.push({
                    ...response.data[order],
                    id: order
                });
            }
            dispatch(ordersInitSuccess(orders));
        })
        .catch(error => {
            console.log('error', error);
            dispatch(ordersInitFailed(error));
        });
    };   
};