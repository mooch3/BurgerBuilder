import React from 'react';
import burgerLogo from '../../Assets/Images/burger-logo.png';
import classes from './Logo.module.css'

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img alt="A Burger Logo" src={burgerLogo}/>
    </div>
);

export default logo;