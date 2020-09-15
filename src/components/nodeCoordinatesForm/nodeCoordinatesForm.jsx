import React from "react";
import Form from "../common/form/index";
import { Label } from "reactstrap";
import "./nodeCoordinatesForm.scss";

class NodeCoordinatesForm extends Form {
  state = {
    data: { xCoord: "", yCoord: "" },
    errors: {},
  };

  componentDidMount() {
    this._initializeForm();
  }

  componentDidUpdate({ data }) {
    if (data && data._id !== this.props.data._id) {
      const { xCoord, yCoord } = this.props.data;
      const data = {
        xCoord,
        yCoord,
      };
      this.setState({
        data,
      });
    }
  }

  _initializeForm() {
    const data = { xCoord: "", yCoord: "" };
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
    }
  };

  render() {
    const { xCoord, yCoord } = this.state.data;
    return (
      <div id="nodeCoordinatesForm">
        <form onSubmit={this.handleSubmit}>
          <Label>Coordinates</Label>
          {this.renderInputFormGroup(
            "xCoord",
            null,
            "number",
            xCoord,
            this.handleChange,
            "X-Coordinate"
          )}
          {this.renderInputFormGroup(
            "yCoord",
            null,
            "number",
            yCoord,
            this.handleChange,
            "Y-Coordinate"
          )}
          {this.renderSubmitBtn("Confirm")}
        </form>
      </div>
    );
  }
}

export default NodeCoordinatesForm;
