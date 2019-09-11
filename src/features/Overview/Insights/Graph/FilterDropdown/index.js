import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "carbon-components-react";

export class FilterDropdown extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    selectedItem: PropTypes.object
  };

  render() {
    const { selectedItem, onChange, options, label } = this.props;
    return (
      <div style={{ width: "15rem", height: "3rem" }}>
        <Dropdown id="filter-dropdown" label={label} onChange={onChange} selectedItem={selectedItem} items={options} titleText={label} />
      </div>
    );
  }
}

export default FilterDropdown;
