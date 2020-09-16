import React from "react";
import Form from "../common/form/index";
import { Label } from "reactstrap";
import "./nodeForcesForm.scss";

class NodeForcesForm extends Form {
  state = {
    data: { _id: "", xForce: "", yForce: "" },
    errors: {},
  };

  componentDidMount() {
    this._initializeForm();
  }

  componentDidUpdate(prevProps) {
    const { data } = prevProps;
    if (data && data._id !== this.props.data._id) {
      const { data } = this.props;
      const _id = String(data._id);
      const xForce = String(data.xForce);
      const yForce = String(data.yForce);
      this.setState({ data: { _id, xForce, yForce } });
    }
  }

  _initializeForm() {
    const data = {
      _id: "",
      xForce: "",
      yForce: "",
    };
    this.setState({ data });
  }

  doUpdate = () => {
    console.log(this.state.data);
  };

  doSubmit = () => {
    this.props.onAddForce(this.state.data);
    this._initializeForm();
  };

  render() {
    const { _id, xForce, yForce } = this.state.data;
    return (
      <div id="nodeForcesForm">
        <form onSubmit={this.handleSubmit}>
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
          {this.renderSubmitBtn("Confirm", _id ? false : true)}
        </form>
      </div>
    );
  }
}

export default NodeForcesForm;
