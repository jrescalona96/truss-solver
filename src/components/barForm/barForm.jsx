import React from "react";
import Form from "../common/form/index";
import "./barForm.scss";

class BarForm extends Form {
  state = {
    data: { startNode: "", endNode: "" },
    errors: {},
  };

  onSubmit = () => {
    console.log(this.state.data);
  };

  render() {
    const { startNode, endNode } = this.state.data;
    return (
      <div id="barForm">
        <h3>Bars Input</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            {this.renderInput({
              name: "startNode",
              label: "Start",
              type: "text",
              value: startNode,
              onChange: this.handleChange,
            })}
            {this.renderInput({
              name: "endNode",
              label: "End",
              type: "text",
              value: endNode,
              onChange: this.handleChange,
            })}
          </div>
          {this.renderSubmitBtn("Add")}
        </form>
      </div>
    );
  }
}

export default BarForm;
