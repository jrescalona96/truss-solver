import React, { Component } from "react";
import "./form.scss";
import InputFormGroup from "../inputFormGroup/index";
import { Button } from "reactstrap";

class Form extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const { value, name } = input;
    const { data } = { ...this.state };
    data[name] = value;
    this.setState({ data });
    if (value) {
      this.doUpdate();
    }
  };

  renderInputFormGroup = (name, label, type, value, onChange, placeholder) => {
    return (
      <InputFormGroup
        name={name}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  };

  renderSubmitBtn = (label) => {
    return (
      <Button color="primary" size="sm" type="submit">
        {label}
      </Button>
    );
  };
}

export default Form;
