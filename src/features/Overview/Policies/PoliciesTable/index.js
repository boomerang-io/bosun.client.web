import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { DataTable } from "carbon-components-react";
import "./styles.scss";

export class PoliciesTable extends Component {
  static propTypes = {
    poicies: PropTypes.array,
    definitions: PropTypes.array
  };
  headers = [
    {
      header: "Name",
      key: "name"
    },

    {
      header: "Definitions",
      key: "definitions"
    },
    {
      header: "Rules",
      key: "definitions"
    },
    {
      header: "Stage Gate Allocations",
      key: "stages"
    },
    {
      header: "Violations",
      key: "violations"
    }
  ];

  handleRowClick = row => {
    const { location, history } = this.props;
    history.push(`${location.pathname}/policy/edit/${row.id}`);
  };

  renderCell = (rowIndex, cellIndex, value) => {
    const column = this.headers[cellIndex];
    switch (column.header) {
      case "Name":
        return <p className="b-policies-table-body__textarea">{value}</p>;
      case "Definitions":
        return <p className="b-policies-table-body__textarea">{Array.isArray(value) ? value.length : "---"}</p>;
      case "Rules":
        return (
          <p className="b-policies-table-body__textarea">
            {Array.isArray(value)
              ? value.reduce((accum, definition) => {
                  accum += definition.rules.length;
                  return accum;
                }, 0)
              : "---"}
          </p>
        );
      // case "Violations":
      //   return <p className="b-policies-table-body__textarea">{value}</p>;
      case "Stage Gate Allocations":
        return <p className="b-policies-table-body__textarea">{ !!value.length?value.join(", "):"---"}</p>;
      case "":
        return (
          <div className="c-policies-table-body__icons">
            {/* <div>
              <Icon
                data-tip
                data-for={`policies-table-${value}-${cellIndex}-edit`}
                className="b-policies-table-body__icon"
                name="icon--edit"
                alt="Edit Policy"
              />
              <Tooltip id={`policies-table-${value}-${cellIndex}-edit`}>Edit</Tooltip>
            </div>
            <div>
              <Icon
                data-tip
                data-for={`policies-table-${value}-${cellIndex}-delete`}
                className="b-policies-table-body__icon"
                name="icon--delete"
                alt="Delete Policy"
              />
              <Tooltip id={`policies-table-${value}-${cellIndex}-delete`}>Delete</Tooltip>
            </div> */}
          </div>
        );
      default:
        return value || "---";
    }
  };

  render() {
    const { policies } = this.props;
    // const policiesList = policies.map(policy => {
    //   const def = definitions.find( def =>(policy.ciPolicyDefinitionId === def.id));
    //   return {...policy, ...def};
    // });
    const { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TableHeader } = DataTable;
    return (
      <DataTable
        rows={policies}
        headers={this.headers}
        render={({ rows, headers, getHeaderProps }) => (
          <TableContainer>
            <Table className="c-policies-table" sortable={true} zebra={false}>
              <TableHead className="b-policies-table-head">
                <TableRow className="b-policies-table-head__row">
                  {headers.map(header => (
                    <TableHeader
                      {...getHeaderProps({ header, className: `b-policies-table-head__header --${header.key}` })}
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className="b-policies-table-body">
                {rows.map((row, rowIndex) => (
                  <TableRow
                    key={row.id}
                    className="b-policies-table-body__row"
                    onClick={() => this.handleRowClick(row)}
                  >
                    {row.cells.map((cell, cellIndex) => (
                      <TableCell key={`${cell.id}-${cellIndex}`} style={{ padding: "0" }}>
                        <div className="b-policies-table-body__cell">
                          {this.renderCell(rowIndex, cellIndex, cell.value)}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
    );
  }
}

export default withRouter(PoliciesTable);
