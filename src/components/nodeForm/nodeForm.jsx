import React from "react";
import { Label } from "reactstrap";
import Form from "../common/form/form";
import "./nodeForm.scss";
class NodeForm extends Form {
  state = {
    data: { _id: "", name: "", xCoord: 0, yCoord: 0, xForce: 0, yForce: 0 },
    errors: {},
  };

  componentDidMount() {
    this._initializeForm();
  }

  _initializeForm() {
    let data = {
      _id: "",
      name: "",
      xCoord: 0,
      yCoord: 0,
      xForce: 0,
      yForce: 0,
    };
    this.setState({ data });
  }

  componentDidUpdate(prevProps) {
    const { data: prevData } = prevProps;
    if (this.props.data._id && prevData._id !== this.props.data._id) {
      const data = this.props.data;
      this.setState({ data });
    }
  }

  doUpdate() {
    const { onAppendNode } = this.props;
    onAppendNode(this.state.data);
  }

  doSubmit() {
    const { onConfirmNode } = this.props;
    onConfirmNode(this.state.data);
    this._initializeForm();
    // else add error for particular input
  }

  render() {
    const { _id, name, xCoord, yCoord, xForce, yForce } = this.state.data;
    return (
      <div id="nodeForm">
        <h3>Nodes</h3>
        {name && <h5>{name}</h5>}
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
          <Label>Forces</Label>
          {this.renderInputFormGroup(
            "xForce",
            null,
            "number",
            xForce,
            this.handleChange,
            "X-Component",
            _id ? false : true
          )}
          {this.renderInputFormGroup(
            "yForce",
            null,
            "number",
            yForce,
            this.handleChange,
            "Y-Component",
            _id ? false : true
          )}
          {this.renderSubmitBtn("Confirm")}
        </form>
      </div>
    );
  }
}

export default NodeForm;
