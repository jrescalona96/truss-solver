import React from "react";
import Form from "../common/form/index";
import "./nodeForm.scss";

class NodeForm extends Form {
  state = {
    data: { _id: "", name: "", x: "", y: "" },
    errors: {},
  };

  componentDidMount() {
    this._initializeForm();
  }

  _initializeForm() {
    const data = { _id: "", name: "", x: "", y: "" };
    this.setState({ data });
  }

  doSubmit = () => {
    const { controller, onConfirmNode } = this.props;
    const data = controller.createNode(this.state.data);
    if (data) onConfirmNode(data);
    this._initializeForm();
  };

  doUpdate = () => {
    const { controller, onAppendNode } = this.props;
    const data = controller.createNode(this.state.data);
    if (data) {
      onAppendNode(data);
      this.setState({ data });
    }
  };

  render() {
    const { x, y } = this.state.data;
    return (
      <div id="nodeForm">
        <h3>Nodes</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "x",
            "X Coordinate",
            "number",
            x,
            this.handleChange,
            "X Coordinate"
          )}
          {this.renderInput(
            "y",
            "Y Coordinate",
            "number",
            y,
            this.handleChange,
            "Y Coordinate"
          )}
          {this.renderSubmitBtn("Add")}
        </form>
      </div>
    );
  }
}

export default NodeForm;
