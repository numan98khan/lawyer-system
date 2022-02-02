import React from "react";
import classes from "./componentCSS/field.module.css";

function SelectField(props) {
  return (
    <div className={classes.TextField}>
      <div>{props.children}</div>
      {props.active ? (
        <>
          <select
            className={classes.editableinput}
            onKeyPress={props.onEnter}
            value={props.value}
            onChange={props.inputChange}
            onBlur={props.blur}
            autoFocus
          >
            {Object.keys(props.options).map((optionKey) => {
              return (
                <option value={optionKey}>{props.options[optionKey]}</option>
              );
            })}
          </select>
        </>
      ) : (
        <div onDoubleClick={props.doubleClick} className={classes.Change}>
          {props.options[props.value]}
        </div>
      )}
    </div>
  );
}

export default SelectField;
