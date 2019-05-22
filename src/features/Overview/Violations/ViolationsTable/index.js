import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { DataTable } from "carbon-components-react";
import "./styles.scss";

export class ViolationsTable extends Component {
  static propTypes = {
    violations: PropTypes.array
  };
  headers = [
    {
      header: "Policy",
      key: "ciPolicyName"
    },
    {
      header: "Stage",
      key: "ciStageName"
    },
    {
      header: "Component",
      key: "ciComponentName"
    },
    {
      header: "Version",
      key: "ciComponentVersionName"
    },
    {
      header: "Violations",
      key: "violations"
    },
    {
      header: "Activity Date",
      key: "ciPolicyActivityCreatedDate"
    }
  ];

  renderCell = (rowIndex, cellIndex, value) => {
    const column = this.headers[cellIndex];
    switch (column.header) {
      case "Activity Date":
        return <p className="b-policies-table-body__textarea">{moment(value).format("MMM DD, YYYY - hh:mm a")}</p>;
      default:
        return <p className="b-policies-table-body__textarea">{value || "---"}</p>;
    }
  };

  render() {
    const { violations } = this.props;
    const { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TableHeader } = DataTable;

    return (
      <DataTable
        rows={violations}
        headers={this.headers}
        render={({ rows, headers, getHeaderProps }) => (
          <TableContainer>
            <Table className="c-violations-table" sortable={true} zebra={false}>
              <TableHead className="b-violations-table-head">
                <TableRow className="b-violations-table-head__row">
                  {headers.map(header => (
                    <TableHeader
                      {...getHeaderProps({ header, className: `b-violations-table-head__header --${header.key}` })}
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className="b-violations-table-body">
                {rows.map((row, rowIndex) => (
                  <TableRow key={row.id} className="b-violations-table-body__row">
                    {row.cells.map((cell, cellIndex) => (
                      <TableCell key={cell.id} style={{ padding: "0" }}>
                        <div className="b-violations-table-body__cell">
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

export default ViolationsTable;
