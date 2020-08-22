import React, { Component } from "react";
import "./form.scss";
import Input from "../input/index";

class Form extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.onSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const { value, name } = input;
    const { data } = { ...this.state };
    data[name] = value;
    this.setState(data);
  };

  renderInput = ({ name, label, type, value, onChange }) => {
    const props = { name, label, type, value, onChange };
    return <Input {...props} />;
  };

  renderSubmitBtn = (label) => {
    return (
      <button className="btn btn-primary btn-small mt-2" type="submit">
        {label}
      </button>
    );
  };
}

export default Form;
