import React from "react";
import Form from "../common/form/index";
import { Label } from "reactstrap";
import "./nodeCoordinatesForm.scss";

class NodeCoordinatesForm extends Form {
  state = {
    data: { _id: "", name: "", xCoord: "", yCoord: "" },
    errors: {},
  };

  componentDidMount() {
    this._initializeForm();
  }

  _initializeForm() {
    const data = {
      _id: "",
      name: "",
      xCoord: "",
      yCoord: "",
    };
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
    const { xCoord, yCoord } = this.state.data;
    return (
      <div id="nodeCoordinatesForm">
        <form onSubmit={this.handleSubmit}>
          <Label>Coordinates</Label>
          {this.renderInput(
            "xCoord",
            null,
            "number",
            xCoord,
            this.handleChange,
            "X-Coordinate"
          )}
          {this.renderInput(
            "yCoord",
            null,
            "number",
            yCoord,
            this.handleChange,
            "Y-Coordinate"
          )}
          {this.renderSubmitBtn("Add")}
        </form>
      </div>
    );
  }
}

export default NodeCoordinatesForm;
