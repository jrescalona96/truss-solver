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
    this.props.onAddTempBar(this.state.data);
  };

  doSubmit = () => {
    this.props.onAddBar(this.state.data);
    this._initializeForm();
  };

  isDisabled = (nodeNameI, nodeNameJ) =>
    nodeNameI && nodeNameJ ? false : true;

  render() {
    const { nodeNameI, nodeNameJ, material, area } = this.state.data;

    return (
      <div id="barForm" className="w-100">
        <h4 className="mt-2">Bars</h4>
        <Label>Nodes</Label>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputFormGroup(
            "nodeNameI",
            "",
            "text",
            nodeNameI,
            this.handleChange,
            "Node 1"
          )}
          {this.renderInputFormGroup(
            "nodeNameJ",
            "",
            "text",
            nodeNameJ,
            this.handleChange,
            "Node 2"
          )}
          {this.renderDropdownMenu(
            ["Steel", "Wood"],
            "material",
            "Material",
            material,
            this.handleChange,
            this.isDisabled(nodeNameI, nodeNameJ)
          )}
          {this.renderDropdownMenu(
            ["Rectangular", "Circular"],
            "area",
            "Area",
            area,
            this.handleChange,
            this.isDisabled(nodeNameI, nodeNameJ)
          )}
          {this.renderSubmitBtn("Add", this.isDisabled(nodeNameI, nodeNameJ))}
        </form>
      </div>
    );
  }
}

export default BarForm;
