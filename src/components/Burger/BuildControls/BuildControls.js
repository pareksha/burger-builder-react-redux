import React from 'react';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => {
    return (
        <div className={styles.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map((control) => {
                return (
                <BuildControl 
                    key={control.label} 
                    ingredientLabel={control.label}
                    added={() => props.ingredientAdded(control.type)}
                    removed={() => props.ingredientDeducted(control.type)}
                    disabled={props.disabledInfo[control.type]}
                />
            )})}
            <button 
                disabled={!props.purchasable}
                className={styles.OrderButton}
                onClick={props.purchasing}>ORDER NOW</button>
        </div>
    )
}

export default buildControls;