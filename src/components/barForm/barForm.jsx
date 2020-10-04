import React from "react";
import "./barForm.scss";
import { Label } from "reactstrap";
import Form from "../common/form/index";

class BarForm extends Form {
  state = {
    data: {
      nodeNameI: "",
      nodeNameJ: "",
      material: "",
      area: "",
    },
    errors: {},
  };

  componentDidMount() {
    this._initializeForm();
  }

  _initializeForm() {
    const data = {
      nodeNameI: "",
      nodeNameJ: "",
      material: "",
      area: "",
    };
    this.setState({ data });
  }

  doUpdate = () => {
    const { onAppendBar } = this.props;
    onAppendBar(this.state.data);
  };

  doSubmit = () => {
    const { onConfirmBar } = this.props;
    onConfirmBar(this.state.data);
    this._initializeForm();
  };

  render() {
    const { nodeNameI, nodeNameJ, material, area } = this.state.data;

    return (
      <div id="barForm">
        <h3>Bars</h3>
        <Label>Nodes</Label>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputFormGroup(
            "nodeNameI",
            "",
            "text",
            nodeNameI,
            this.handleChange,
            "Node I connection"
          )}
          {this.renderInputFormGroup(
            "nodeNameJ",
            "",
            "text",
            nodeNameJ,
            this.handleChange,
            "Node J connection"
          )}
          {this.renderInputFormGroup(
            "material",
            "",
            "text",
            material,
            this.handleChange,
            "Material"
          )}
          {this.renderInputFormGroup(
            "area",
            "",
            "text",
            area,
            this.handleChange,
            "Area"
          )}
          {this.renderSubmitBtn("Add")}
        </form>
      </div>
    );
  }
}

export default BarForm;
