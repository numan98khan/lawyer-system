import React from "react";
import classes from "./componentCSS/field.module.css";

function handleEnter(event) {
  console.log("event");
  console.log(event.keyCode);

  // setFirstNameInput(false)
  // if(firstName.length < 1){
  //   setFirstName(temp)
  // }

  if (event.keyCode === 0) {
    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);
    form.elements[index + 1].focus();
    event.preventDefault();
  }
}

export const Field = (props) => {
  return (
    <div className={classes.TextField}>
      <div>{props.children}</div>
      {props.active ? (
        <input
          className={classes.editableinput}
          onKeyPress={props.onEnter}
          value={props.value}
          onChange={props.inputChange}
          onBlur={props.blur}
          autoFocus
        />
      ) : (
        <div onDoubleClick={props.doubleClick} className={classes.Change}>
          {props.value}
        </div>
      )}
    </div>
  );
};
