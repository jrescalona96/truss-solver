import React from "react";
import Form from "../common/form/index";
import "./nodeForm.scss";

class NodeForm extends Form {
  state = {
    data: { _id: "", x: 0, y: 0 },
    errors: {},
  };

  _initializeNode() {
    const data = { _id: "", x: 0, y: 0 };
    this.setState({ data });
  }

  doSubmit = () => {
    let data = this.parseInput();
    data._id = `N${this.props.nodes.length}`;
    this.setState({ data });
    this.props.onAddNode(data);
    this._initializeNode();
  };

  doUpdate = () => {
    let data = this.parseInput();
    data._id = "";
    this.setState({ data });
    this.props.onSetNodes(data);
  };

  parseInput = () => {
    const { x, y } = this.state.data;
    const xCoor = x === "" ? 0 : Number(x);
    const yCoor = y === "" ? 0 : Number(y);
    const data = { ...this.state.data };
    data.x = xCoor;
    data.y = yCoor;
    return data;
  };

  render() {
    const { _id, x, y } = this.state.data;
    return (
      <div id="nodeForm">
        <h3>Nodes</h3>
        <p>Node {_id}</p>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({
            name: "x",
            label: "X Coordinate",
            type: "number",
            value: x,
            onChange: this.handleChange,
          })}
          {this.renderInput({
            name: "y",
            label: "Y Coordinate",
            type: "number",
            value: y,
            onChange: this.handleChange,
          })}
          {this.renderSubmitBtn("Add")}
        </form>
      </div>
    );
  }
}

export default NodeForm;
