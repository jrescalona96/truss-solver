import React from "react";
import "./barForm.scss";
import { Label } from "reactstrap";
import Form from "../common/form/index";

class BarForm extends Form {
  state = {
    data: {
      _id: "",
      nodeNameI: "",
      nodeNameJ: "",
      material: "Steel",
      section: "Circular",
    },
    errors: {},
  };

  componentDidMount() {
    this._initializeForm();
  }

  _initializeForm() {
    const data = {
      _id: "",
      nodeNameI: "",
      nodeNameJ: "",
      material: "Steel",
      section: "Circular",
    };
    this.setState({ data });
  }

  componentDidUpdate(prevProps) {
    const { data: prevData } = prevProps;
    const { data: newData } = this.props;
    if (newData._id && prevData._id !== newData._id) {
      const { _id, nodeI, nodeJ, material, section } = newData;
      let data = { ...this.state.data };
      data._id = _id;
      data.nodeNameI = nodeI.name;
      data.nodeNameJ = nodeJ.name;
      data.material = material.type;
      data.section = section.type;
      this.setState({ data });
    }
  }

  doUpdate = () => {
    this.props.onUpdateBar(this.state.data);
  };

  doSubmit = () => {
    this.props.onAddBar(this.state.data);
    this._initializeForm();
  };

  isDisabled = (nodeNameI, nodeNameJ) =>
    nodeNameI && nodeNameJ ? false : true;

  render() {
    const { _id, nodeNameI, nodeNameJ, material, section } = this.state.data;

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
            "section",
            "Section",
            section,
            this.handleChange,
            this.isDisabled(nodeNameI, nodeNameJ)
          )}

          {this.renderSubmitBtn(
            _id ? "Update" : "Add",
            this.isDisabled(nodeNameI, nodeNameJ)
          )}
          {_id
            ? this.renderActionButton(
                "Delete",
                () => this.props.onDeleteBar(_id),
                "danger"
              )
            : null}
        </form>
      </div>
    );
  }
}

export default BarForm;
