import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

const CNIC_REGEX = /^(\d{5})-(\d{7})-(\d{1})$/;

function CNICTextField(props) {
  const { label, name, value, onChange } = props;
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (!inputValue || CNIC_REGEX.test(inputValue)) {
      onChange(event);
      setError(false);
    } else {
      setError(true);
    }
  };

  const formatCNIC = (value) => {
    const match = value.match(CNIC_REGEX);
    if (match) {
      return match[1] + "-" + match[2] + "-" + match[3];
    } else {
      return value;
    }
  };

  return (
    <TextField
      required
      name={name}
      label={label}
      value={formatCNIC(value)}
      onChange={handleInputChange}
      fullWidth
      error={error}
      helperText={error ? "Please enter a valid CNIC number" : ""}
      inputProps={{
        maxLength: 15,
        pattern: "\\d{5}-\\d{7}-\\d{1}",
      }}
    />
  );
}

export default CNICTextField;
