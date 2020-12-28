import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { Dropdown } from "@boomerang-io/carbon-addons-boomerang-react";

type Props = {
    label: string;
    options: any[];
    onChange: (...args: any[]) => any;
    selectedItem?: any;
};

export function FilterDropdown({ selectedItem, onChange, options, label }: Props) {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div style={{ width: "15rem", height: "3rem" }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
