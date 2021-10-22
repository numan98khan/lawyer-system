import React from 'react';
import classes from './componentCSS/field.module.css';

function SelectField() {
    return (
        <div className = {classes.TextField}>
        <div>{props.children}</div>
        {
        props.active ? 
          <select className={classes.editableinput} 
            onKeyPress = {props.onEnter}
          value = {props.value} onChange = {props.inputChange} onBlur = {props.blur} autoFocus/> 
            : 
          <div onDoubleClick = {props.doubleClick} className = {classes.Change}>
            {props.value}
          </div>
        }
      </div>
    )
}

export default SelectField
