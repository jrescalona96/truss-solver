import React from "react";
import { Label } from "reactstrap";
import Form from "../common/form/form";
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
      support: "None",
    },
    supportOptions: ["Pin", "Roller", "None"],
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
      support: "None",
    };
    this.setState({ data });
    this.setState({ support: "" });
  }

  componentDidUpdate(prevProps) {
    const { data: prevData } = prevProps;
    const { data: newData } = this.props;
    if (newData._id && prevData._id !== newData._id) {
      let data = { ...newData };
      data.xCoord = newData.coordinates.x;
      data.yCoord = newData.coordinates.y;
      data.xForce = newData.force.x;
      data.yForce = newData.force.y;
      data.support = newData.support.type;
      delete data["coordinates"];
      delete data["force"];
      delete data["displacement"];
      this.setState({ data });
    }
  }

  doDelete(_id) {
    this.props.onDeleteNode(_id);
    this._initializeForm();
  }

  doUpdate() {
    this.props.onUpdateNode(this.state.data);
  }

  doSubmit() {
    this.props.onAddNode(this.state.data);
    this._initializeForm();
    // else add error for particular input
  }

  render() {
    const {
      _id,
      name,
      xCoord,
      yCoord,
      xForce,
      yForce,
      support,
    } = this.state.data;

    const { supportOptions: options } = this.state;

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
            this.handleChange,
            _id ? false : true
          )}
          {this.renderSubmitBtn(_id ? "Update" : "Add")}
          {_id
            ? this.renderActionButton(
                "Delete",
                () => this.doDelete(_id),
                "danger"
              )
            : null}
        </form>
      </div>
    );
  }
}

export default NodeForm;
