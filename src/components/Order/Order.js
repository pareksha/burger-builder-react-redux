import React from 'react';

import styles from './Order.module.css';

const order = (props) => {
    let ingredients = [];
    for(let ing in props.ingredients) {
        ingredients.push({
            name: ing,
            count: props.ingredients[ing]
        });
    };

    const ingOutput = ingredients.map(ing => {
        return <span
                    key={ing.name}
                    style={{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }}>{ing.name} ({ing.count})</span>
    });

    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;