import React, { Component } from "react";
import "./form.scss";

class Form extends Component {
  state = {
    data: [{ x: 0, y: 0 }],
    x: "",
    y: "",
    errors: {},
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.x, this.state.y);
  };

  handleChange = ({ currentTarget: input }) => {
    const val = input.value;
    if (input.name === "x") {
      this.setState({ x: val });
    } else {
      this.setState({ y: val });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="">x</label>
          <input
            name="x"
            type="number"
            className="form-control"
            value={this.state.x}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor=""> y </label>
          <input
            name="y"
            type="number"
            className="form-control"
            value={this.state.y}
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

export default Form;
