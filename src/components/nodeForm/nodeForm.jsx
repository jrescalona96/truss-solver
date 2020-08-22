import React from "react";
import Form from "../common/form/index";
import Node from "../../models/Node";
import * as controller from "../../controllers/NodeController";
import "./nodeForm.scss";

class NodeForm extends Form {
  state = {
    data: { _id: "", x: "", y: "" },
    errors: {},
  };

  componentDidMount() {
    this._initializeForm();
  }

  _initializeForm() {
    const data = new Node("", "", "");
    this.setState({ data });
  }

  doSubmit = () => {
    const { nodes, onConfirmNode } = this.props;
    const { data } = this.state;
    data._id = `n${nodes.length}`;
    onConfirmNode(data);
    this._initializeForm();
  };

  doUpdate = () => {
    const data = controller.createNode(this.state.data);
    this.setState({ data });
    this.props.onSetCurrentNodes(data);
  };

  render() {
    const { _id, x, y } = this.state.data;
    return (
      <div id="nodeForm">
        <h3>Nodes</h3>
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
