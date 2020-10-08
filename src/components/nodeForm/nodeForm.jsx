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
      support: "",
    },
    supportOptions: ["Pin", "Roller"],
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
      support: "",
    };
    this.setState({ data });
    this.setState({ support: "" });
  }

  componentDidUpdate(prevProps) {
    const { data: prevData } = prevProps;
    if (this.props.data._id && prevData._id !== this.props.data._id) {
      const data = { ...this.props.data };
      const support = nodeController.getSupportType(data);
      this.setState({ support });
      this.setState({ data });
    }
  }

  handleSetSupport = (event) => {
    this.handleChange(event);
    const { xSupport, ySupport } = nodeController.getSupportValues(
      this.state.data.support
    );
    const data = { ...this.state.data };
    data.xSupport = xSupport;
    data.ySupport = ySupport;
    this.setState({ data });
  };

  doUpdate() {
    this.props.onAddTempNode(this.state.data);
  }

  doSubmit() {
    this.props.onAddNode(this.state.data);
    this._initializeForm();
    // else add error for particular input
  }

  render() {
    const { _id, name, xCoord, yCoord, xForce, yForce } = this.state.data;
    const { supportOptions: options, support } = this.state;
    return (
      <div id="nodeForm" className="w-100">
        <h4>Nodes</h4>
        {name && <Label>Name: {name}</Label>}
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
          <Label>Support Type</Label>
          {this.renderDropdownMenu(
            options,
            "support",
            "Support",
            support,
            this.handleSetSupport,
            _id ? false : true
          )}
          {this.renderSubmitBtn(_id ?"Update" : "Add")}
          {_id ? this.renderActionButton("Delete", () => this.props.onDeleteNode(_id), "danger") : null}
        </form>
      </div>
    );
  }
}

export default NodeForm;
