import React from "react";
import Form from "../common/form/index";
import { Label } from "reactstrap";
import "./nodeForcesForm.scss";

class NodeForcesForm extends Form {
  state = {
    data: { _id: "", xForce: "", yForce: "" },
    errors: {},
  };

  componentDidMount() {
    this._initializeForm();
  }

  _initializeForm() {
    const data = {
      _id: "",
      xForce: "",
      yForce: "",
    };
    this.setState({ data });
  }

  doUpdate = () => {
    console.log(this.state.data);
  };

  doSubmit = () => {
    this.props.onAddForce(this.state.data);
    this._initializeForm();
  };

  render() {
    const { xForce, yForce } = this.state.data;
    return (
      <div id="nodeForcesForm">
        <form onSubmit={this.handleSubmit}>
          <Label>Forces</Label>
          {this.renderInputFormGroup(
            "xForce",
            null,
            "number",
            xForce,
            this.handleChange,
            "X-Component"
          )}
          {this.renderInputFormGroup(
            "yForce",
            null,
            "number",
            yForce,
            this.handleChange,
            "Y-Component"
          )}
          {this.renderSubmitBtn("Confirm")}
        </form>
      </div>
    );
  }
}

export default NodeForcesForm;
