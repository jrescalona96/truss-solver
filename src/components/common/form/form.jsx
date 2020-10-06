import React, { Component } from "react";
import InputFormGroup from "../inputFormGroup/index";
import Menu from "../menu/index";
import { Button } from "reactstrap";
import "./form.scss";

class Form extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const { data } = { ...this.state };
    const { value, name } = input;
    data[name] = value;
    this.setState({ data });
    if (value) this.doUpdate();
  };

  renderInputFormGroup = (
    name,
    label,
    type,
    value,
    onChange,
    placeholder,
    disabled
  ) => {
    return (
      <InputFormGroup
        name={name}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  };

  renderSubmitBtn = (label, disabled) => {
    return (
      <Button
        color={disabled ? "secondary" : "primary"}
        size="sm"
        type="submit"
        disabled={disabled}
        className="w-100"
      >
        {label}
      </Button>
    );
  };

  renderDropdownMenu = (options, name, label, selected, onChange, disabled) => {
    return (
      <Menu
        options={options}
        name={name}
        label={label}
        selected={selected}
        onChange={onChange}
        disabled={disabled}
      />
    );
  };
}

export default Form;
