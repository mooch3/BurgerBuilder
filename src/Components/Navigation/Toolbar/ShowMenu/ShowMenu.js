import React from 'react';
import classes from './ShowMenu.module.css';

const showMenu = (props) => (
    <div className={classes.ShowMenu} onClick={props.openMenu}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default showMenu