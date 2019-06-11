import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { DataTable } from "carbon-components-react";
import styles from "./policiesTable.module.scss";
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
        return <p className={styles.tableTextarea}>{value}</p>;
      case "Definitions":
        return <p className={styles.tableTextarea}>{Array.isArray(value) ? value.length : "---"}</p>;
      case "Rules":
        return (
          <p className={styles.tableTextarea}>
            {Array.isArray(value)
              ? value.reduce((accum, definition) => {
                  accum += definition.rules.length;
                  return accum;
                }, 0)
              : "---"}
          </p>
        );

      case "Stage Gate Allocations":
        return <p className={styles.tableTextarea}>{!!value.length ? value.join(", ") : "---"}</p>;
      case "":
        return (
          <div className={styles.tableIcons}>
            {/* <div>
              <Icon
                data-tip
                data-for={`policies-table-${value}-${cellIndex}-edit`}
                className={styles.tableIcon}
                name="icon--edit"
                alt="Edit Policy"
              />
              <Tooltip id={`policies-table-${value}-${cellIndex}-edit`}>Edit</Tooltip>
            </div>
            <div>
              <Icon
                data-tip
                data-for={`policies-table-${value}-${cellIndex}-delete`}
                className={styles.tableIcon}
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
    const { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TableHeader } = DataTable;
    return (
      <DataTable
        rows={policies}
        headers={this.headers}
        render={({ rows, headers, getHeaderProps }) => (
          <TableContainer>
            <Table className={styles.tableContainer} sortable={true} zebra={false}>
              <TableHead>
                <TableRow className={styles.tableHeadRow}>
                  {headers.map(header => (
                    <TableHeader {...getHeaderProps({ header, className: `${styles.tableHeader}` })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className={styles.tableBody} data-testid="policies-tbody">
                {rows.map((row, rowIndex) => (
                  <TableRow key={row.id} className={styles.tableRow} onClick={() => this.handleRowClick(row)}>
                    {row.cells.map((cell, cellIndex) => (
                      <TableCell key={`${cell.id}-${cellIndex}`} style={{ padding: "0" }}>
                        <div className={styles.tableCell}>{this.renderCell(rowIndex, cellIndex, cell.value)}</div>
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
