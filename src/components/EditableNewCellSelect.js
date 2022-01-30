import React from "react";
// import classes from './componentCSS/field.module.css';

import SelectField from "../components/SelectField";
import TableCell from "@material-ui/core/TableCell";

const RowCell = (props) => {
  const [cellValue, setCellValue] = React.useState(props.value);
  const [cellOptions, setCellOptions] = React.useState(props.options);
  const [cellValueInput, setCellValueInput] = React.useState(false);
  const [temp, settemp] = React.useState("");

  function updateChange() {
    setCellValueInput(false);
    if (cellValue.length < 1) {
      setCellValue(temp);
    } else if (temp !== cellValue) {
      props.changeCellValue(props.cell, cellValue);
    }
  }

  return (
    <TableCell align="center">
      <div className={`${cellValueInput === false ? "editablecell" : ""} `}>
        <SelectField
          value={cellValue}
          options={cellOptions}
          onEnter={(event) => {
            // console.log('event')
            // console.log(event.key)

            if (event.key === "Enter") {
              updateChange();
            }
          }}
          inputChange={(e) => {
            setCellValue(e.target.value);
          }}
          doubleClick={() => {
            settemp(cellValue);
            setCellValueInput(true);
          }}
          blur={() => {
            updateChange();
          }}
          active={cellValueInput}
        ></SelectField>
      </div>
    </TableCell>
  );
};

export default RowCell;
