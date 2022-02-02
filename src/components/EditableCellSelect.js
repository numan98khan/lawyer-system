import React from "react";
// import classes from './componentCSS/field.module.css';

import SelectField from "../components/SelectField";
import TableCell from "@material-ui/core/TableCell";

const RowCell = (props) => {
  const [cellValue, setCellValue] = React.useState(props.value);
  const [cellValueInput, setCellValueInput] = React.useState(false);
  const [temp, settemp] = React.useState("");
  const cellOptions = props.options;

  function updateChange() {
    setCellValueInput(false);
    if (cellValue.length < 1) {
      setCellValue(temp);
    } else if (temp !== cellValue) {
      console.log("case path", props.file_n + "/" + props.case_n);
      props.updateHearing(
        props.cell,
        cellValue,
        props.hearing_key,
        temp,
        props.file_n + "/" + props.case_n
      );
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
