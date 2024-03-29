import classes from './Button.module.css'
import React from 'react'

const button = (props) => (
    <button
    onClick={props.click}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    >{props.children}</button>
)

export default button