import * as React from "react";
import TextField from "@mui/material/TextField";

const InputField = ({
  children,
  label = "default label",
  onClick,
  size,
  variant,
}) => {
  return (
    <TextField
      InputLabelProps={{
        sx: {
          color: "white",
        },
      }}
      inputProps={{
        sx: {
          color: "white",
          paddingLeft: "15px",
          fontSize: "15px",
          backgroundColor: "#100f0f",
          borderRadius: "5px",
        },
      }}
      label={label}
      onClick={onClick}
      size={size}
      variant={variant}
      required
    >
      {children}
    </TextField>
  );
};

export default InputField;
