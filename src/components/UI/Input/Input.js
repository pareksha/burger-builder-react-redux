import React from 'react';

import styles from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const classes = [styles.InputElement];
    if(props.invalid && props.shouldValidate && props.touched) {
        classes.push(styles.InvalidInput);
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                                className={classes.join(' ')}
                                value={props.value} 
                                {...props.elementConfig} 
                                type={props.elementType}
                                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea 
                                className={classes.join(' ')} 
                                value={props.value} 
                                {...props.elementConfig} 
                                type={props.elementType}
                                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={classes.join(' ')} 
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}}
                </select>
            );
            break;
        default:
            inputElement = <input 
                                className={classes.join(' ')} 
                                value={props.value} 
                                {...props.elementConfig} 
                                type={props.elementType}
                                onChange={props.changed} />;
    }
    return (
        <div className={styles.Input} >
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;