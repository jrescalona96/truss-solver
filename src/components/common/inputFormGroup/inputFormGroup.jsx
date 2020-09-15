import React from "react";
import { Input, FormGroup, Label } from "reactstrap";
import "./inputFormGroup.scss";
const InputFormGroup = ({
  name,
  label,
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="inputFormGroup">
      <FormGroup>
        <Label for={name}>{label}</Label>
        <Input
          bsSize="sm"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </FormGroup>
    </div>
  );
};
export default InputFormGroup;
