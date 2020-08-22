import React from "react";
import Form from "../common/form/index";
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
    const { controller } = this.props;
    const data = controller.createNode();
    this.setState({ data });
  }

  doSubmit = () => {
    const { nodes, onConfirmNode } = this.props;
    const { data: node } = this.state;
    node.name = `n${nodes.length}`;
    onConfirmNode(node);
    this._initializeForm();
  };

  doUpdate = () => {
    const { controller } = this.props;
    const data = controller.createNode(this.state.data);
    this.setState({ data });
    this.props.onSetNode(data);
  };

  render() {
    const { x, y } = this.state.data;
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