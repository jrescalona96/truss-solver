import React from "react";
import Form from "../common/form/index";
import "./barForm.scss";

class BarForm extends Form {
  state = {
    data: {
      _id: "",
      name1: "",
      name2: "",
    },
    errors: {},
  };

  componentDidMount() {
    this._initializeForm();
  }

  _initializeForm() {
    this.setState({
      _id: "",
      name1: "",
      name2: "",
    });
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
      this.setState(data);
    }
  };

  render() {
    const { name1, name2 } = this.state.data;
    return (
      <div id="barForm">
        <h3>Bars Input</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            {this.renderInput({
              name: "name1",
              label: "Node 1",
              type: "text",
              value: name1,
              onChange: this.handleChange,
            })}
            {this.renderInput({
              name: "name2",
              label: "Node 2",
              type: "text",
              value: name2,
              onChange: this.handleChange,
            })}
          </div>
          {this.renderSubmitBtn("Add")}
        </form>
      </div>
    );
  }
}

export default BarForm;
