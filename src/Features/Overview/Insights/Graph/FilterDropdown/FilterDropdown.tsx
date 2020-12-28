import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "@boomerang-io/carbon-addons-boomerang-react";

FilterDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedItem: PropTypes.object
};

export function FilterDropdown({ selectedItem, onChange, options, label }) {
  return (
    <div style={{ width: "15rem", height: "3rem" }}>
      <Dropdown
        id="filter-dropdown"
        label={label}
        onChange={onChange}
        selectedItem={selectedItem}
        items={options}
        titleText={label}
      />
    </div>
  );
}

export default FilterDropdown;
