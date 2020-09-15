import React from "react";
import Form from "../common/form/index";
import "./barForm.scss";

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
    const { controller, onAppendBar } = this.props;
    const bar = controller.createBar(this.state.data);
    if (bar) {
      onAppendBar(bar);
    }
  };

  doSubmit = () => {
    const { controller, onConfirmBar } = this.props;
    const data = controller.createBar(this.state.data);
    if (data) {
      onConfirmBar(data);
      this._initializeForm();
    }
  };

  render() {
    const { nodeNameI, nodeNameJ, material, area } = this.state.data;

    return (
      <div id="barForm">
        <h3>Bars</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "nodeNameI",
            "Node Name",
            "text",
            nodeNameI,
            this.handleChange,
            "Node I connection"
          )}
          {this.renderInput(
            "nodeNameJ",
            "Node Name",
            "text",
            nodeNameJ,
            this.handleChange,
            "Node J connection"
          )}
          {this.renderInput(
            "material",
            "Material",
            "text",
            material,
            this.handleChange,
            "Material Type"
          )}
          {this.renderInput(
            "area",
            "Area",
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
