import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./menu.scss";

const Menu = ({ options, name, label, selected, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prevState) => !prevState);
  return (
    <Dropdown
      className="mb-1"
      disabled={disabled}
      isOpen={isOpen}
      toggle={toggle}
      size="sm"
    >
      <DropdownToggle
        color={disabled ? "secondary" : "primary"}
        size="sm"
        className="col-12"
        caret
      >
        {selected ? selected : label}
      </DropdownToggle>
      <DropdownMenu>
        {options.map((item) => (
          <DropdownItem
            key={item}
            name={name}
            value={item}
            onClick={() => onChange(item)}
          >
            {item}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
export default Menu;
