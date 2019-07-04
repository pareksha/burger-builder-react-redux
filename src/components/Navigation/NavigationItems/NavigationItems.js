import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const navigationItems = (props) => {
    let authNavItem = <NavigationItem link='/auth'>Authenticate</NavigationItem>;
    let orders = null;
    if(props.isAuthenticated) {
        authNavItem = <NavigationItem link='/logout'>Logout</NavigationItem>;
        orders = <NavigationItem link='/orders'>Orders</NavigationItem>;
    }
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link='/'>Burger Builder</NavigationItem>
            {orders}
            {authNavItem}
        </ul>
    );
};

export default navigationItems;