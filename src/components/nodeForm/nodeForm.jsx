import React from "react";
import { Label } from "reactstrap";
import Form from "../common/form/form";
import "./nodeForm.scss";
class NodeForm extends Form {
  state = {
    data: { _id: "", xCoord: "", yCoord: "", xForce: "", yForce: "" },
    errors: {},
  };

  componentDidMount() {
    this._initializeForm();
  }

  _initializeForm() {
    let data = {
      _id: "",
      name: "",
      xCoord: "",
      yCoord: "",
      xForce: "",
      yForce: "",
    };
    if (this.props.data._id) data = { ...this.props.data };
    this.setState({ data });
  }

  // componentDidUpdate(prevProps) {
  //   const { data: prevData } = prevProps;
  //   if (prevData._id && prevData._id !== this.props.data._id) {
  //     const {
  //       _id,
  //       xCoord: xc,
  //       yCoord: yc,
  //       xForce: xf,
  //       yForce: yf,
  //     } = this.props.data;
  //     const xCoord = String(xc);
  //     const yCoord = String(yc);
  //     const xForce = String(xf);
  //     const yForce = String(yf);
  //     const data = { _id, xCoord, yCoord, xForce, yForce };
  //     this.setState({ data });
  //   }
  // }

  doUpdate() {
    const { controller, onAppendNode } = this.props;
    const data = controller.createNode(this.state.data);
    if (data) {
      onAppendNode(data);
    }
  }

  doSubmit() {
    const { controller, onConfirmNode } = this.props;
    const node = controller.createNode(this.state.data);
    if (node) onConfirmNode(node);
    // else add error for particular input
  }

  render() {
    const { _id, name, xCoord, yCoord, xForce, yForce } = this.state.data;
    return (
      <div id="nodeForm">
        <h3>Nodes</h3>
        {name && <h4>{name}</h4>}
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
