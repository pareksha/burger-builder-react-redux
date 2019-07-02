import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchaseComplete: false,
};

const purchasedInit = (state, action) => {
    return updateObject(state, {purchaseComplete: false});
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrderObject = updateObject(action.newOrder, {id: action.orderId});
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrderObject),
        purchaseComplete: true
    });
};

const purchaseBurgerFailed = (state, action) => {
    return updateObject(state, {loading: false});
};

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        purchaseComplete: false,
    });
};

const ordersInitStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const ordersInitSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        orders: action.orders,
    });
};

const ordersInitFailed = (state, action) => {
    return (state, {loading: false});
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASED_INIT: return purchasedInit(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.ORDERS_INIT_START: return ordersInitStart(state, action);
        case actionTypes.ORDERS_INIT_SUCCESS: return ordersInitSuccess(state, action);
        case actionTypes.ORDERS_INIT_FAILED: return ordersInitFailed(state, action);
        default: return state;
    };
};

export default reducer;