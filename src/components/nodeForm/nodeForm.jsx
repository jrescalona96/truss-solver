import React from "react";
import Form from "../common/form/index";
import "./nodeForm.scss";

class NodeForm extends Form {
  state = {
    data: { x: 0, y: 0 },
    errors: {},
  };

  onSubmit = () => {
    const { x, y } = this.state.data;
    const xCoor = Number(x);
    const yCoor = Number(y);
    this.props.onSetData({ x: xCoor, y: yCoor });
  };

  render() {
    return (
      <div id="node-form">
        <h2>Node Input</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({
            name: "x",
            label: "X Coordinate",
            type: "number",
            value: this.state.data.x,
            onChange: this.handleChange,
          })}
          {this.renderInput({
            name: "y",
            label: "Y Coordinate",
            type: "number",
            value: this.state.data.y,
            onChange: this.handleChange,
          })}
          {this.renderSubmitBtn("Add")}
        </form>
      </div>
    );
  }
}

export default NodeForm;
