import React from "react";
import "./barForm.scss";
import { Label } from "reactstrap";
import Form from "../common/form/index";

// TODO: Add dynamic dimensions for bar
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

	componentDidUpdate(prev) {
		const current = this.props.data;
		if (prev.data._id !== current._id) {
			const { _id, nodeI, nodeJ, material, section } = current;
			const data = {
				_id,
				nodeNameI: nodeI.name,
				nodeNameJ: nodeJ.name,
				material: material._type,
				section: section.type,
			};
			this.setState({ data });
		}
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

	doUpdate = () => {
		this.props.onUpdateBar(this.state.data);
	};

	doSubmit = () => {
		this.props.onAddBar(this.state.data);
		this._initializeForm();
	};

	doDelete = () => {
		this.props.onDeleteBar(this.state.data._id);
		this._initializeForm();
	};

	isDisabled = (nodeNameI, nodeNameJ) => {
		return nodeNameI && nodeNameJ ? false : true;
	};
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
						? this.renderActionButton("Delete", this.doDelete, "danger")
						: null}
				</form>
			</div>
		);
	}
}

export default BarForm;
