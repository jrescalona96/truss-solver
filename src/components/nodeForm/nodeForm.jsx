import React from "react";
import { Label } from "reactstrap";
import Form from "../common/form/form";
import * as nodeController from "../../controllers/nodeController";
import "./nodeForm.scss";
class NodeForm extends Form {
  state = {
    data: {
      _id: "",
      name: "",
      xCoord: 0,
      yCoord: 0,
      xForce: 0,
      yForce: 0,
      xSupport: 0,
      ySupport: 0,
    },
    support: "",
    options: ["Pin", "Roller"],
    errors: {},
  };

  _initializeForm() {
    let data = {
      _id: "",
      name: "",
      xCoord: 0,
      yCoord: 0,
      xForce: 0,
      yForce: 0,
      xSupport: 0,
      ySupport: 0,
    };
    this.setState({ data });
    this.setState({ support: "" });
  }

  componentDidUpdate(prevProps) {
    const { data: prevData } = prevProps;
    if (this.props.data._id && prevData._id !== this.props.data._id) {
      const data = this.props.data;
      const support = nodeController.getSupportType(data);
      this.setState({ support });
      this.setState({ data });
    }
  }

  handleSetSupport = (supportName) => {
    const { xSupport, ySupport } = nodeController.getSupportValues(supportName);
    const data = { ...this.state.data };
    data.xSupport = xSupport;
    data.ySupport = ySupport;
    this.setState({ support: supportName });
    this.setState({ data });
  };

  doUpdate() {
    this.props.onAddTempNode(this.state.data);
  }

  doSubmit() {
    this.props.onConfirmNode(this.state.data);
    this._initializeForm();
    // else add error for particular input
  }

  render() {
    const { _id, name, xCoord, yCoord, xForce, yForce } = this.state.data;
    const { options, support } = this.state;
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
          {this.renderDropdownMenu(
            options,
            "support",
            "Support",
            support,
            this.handleSetSupport,
            _id ? false : true
          )}
          {this.renderSubmitBtn("Confirm")}
        </form>
      </div>
    );
  }
}

export default NodeForm;
