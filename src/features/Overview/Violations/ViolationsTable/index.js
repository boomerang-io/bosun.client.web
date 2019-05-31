import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { DataTable } from "carbon-components-react";
import styles from "./violationsTable.module.scss";
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
        return <p className={styles.tableTextarea} >{moment(value).format("MMM DD, YYYY - hh:mm a")}</p>;
      default:
        return <p className={styles.tableTextarea}>{value || "---"}</p>;
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
            <Table className={styles.tableContainer} sortable={true} zebra={false}>
              <TableHead>
                <TableRow className={styles.tableHeadRow}>
                  {headers.map(header => (
                    <TableHeader
                      {...getHeaderProps({ header, className: `${styles.tableHeader}` })}
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className={styles.tableBody}>
                {rows.map((row, rowIndex) => (
                  <TableRow key={row.id}>
                    {row.cells.map((cell, cellIndex) => (
                      <TableCell key={cell.id} style={{ padding: "0" }}>
                        <div className={styles.tableCell}>
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
