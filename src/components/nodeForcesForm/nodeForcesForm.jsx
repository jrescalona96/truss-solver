import React from "react";
import Form from "../common/form/index";
import { Label } from "reactstrap";
import "./nodeForcesForm.scss";

class NodeForcesForm extends Form {
  state = {
    data: { xForce: "", yForce: "" },
    errors: {},
  };

  render() {
    const { xForce, yForce } = this.state.data;
    return (
      <div id="nodeForcesForm">
        <Label>Forces</Label>
        {this.renderInput(
          "xForce",
          null,
          "number",
          xForce,
          this.handleChange,
          "X-Component"
        )}
        {this.renderInput(
          "yForce",
          null,
          "number",
          yForce,
          this.handleChange,
          "Y-Component"
        )}
        {this.renderSubmitBtn("Submit")}
      </div>
    );
  }
}

export default NodeForcesForm;
