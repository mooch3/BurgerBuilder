import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import ShowMenu from './ShowMenu/ShowMenu'

const toolbar = (props) => {
   return (
   <header className={classes.Toolbar}>
        <ShowMenu openMenu={props.openMenu}/>
        <div className={classes.Logo}>
            <Logo />
        </div>     
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>)
}

export default toolbar