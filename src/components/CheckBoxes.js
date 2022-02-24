import * as React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const CheckboxLabels = ({ label, onChange }) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => {
              onChange(e);
            }}
            value={label}
            name={label}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};
export default CheckboxLabels;
