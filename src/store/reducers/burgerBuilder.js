import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        totalPrice: 4,
        ingredients: action.ingredients,
    });
};

const addIngredients = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    });
    return (state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    });
};

const removeIngredients = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    });
    return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    });
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.ADD_INGREDIENT: return addIngredients(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state, action);
        default: return state;
    }
}

export default reducer;