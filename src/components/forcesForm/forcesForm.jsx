import React from "react";
import "./forcesForm.scss";
import Form from "../common/form/index";

class ForcesForm extends Form {
  state = {
    data: { _id: "", x: "", y: "" },
    errors: {},
  };

  render() {
    const { x, y } = this.state.data;
    return (
      <div id="forcesForm">
        {this.renderInput("xForce", "X Force", "number", x, this.handleChange)}
      </div>
    );
  }
}
export default ForcesForm;
