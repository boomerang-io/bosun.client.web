import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { DataTable } from "carbon-components-react";
import styles from "./violationsTable.module.scss";

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
      key: "nbrViolations"
    },
    {
      header: "Failed Definition Types",
      key: "ciPolicyDefinitionTypes"
    },
    {
      header: "Activity Date",
      key: "ciPolicyActivityCreatedDate"
    }
  ];

  subHeaders = [
    {
      header: "Metrics",
      key: "metric"
    },
    {
      header: "Message",
      key: "message"
    }
  ];

  renderCell = (rowIndex, cellIndex, value) => {
    const column = this.headers[cellIndex];
    switch (column.header) {
      case "Activity Date":
        return <p className={styles.tableTextarea}>{moment(value).format("MMM DD, YYYY - hh:mm a")}</p>;
      case "Failed Definition Types":
        return <p className={styles.tableTextarea}>{value && value.length ? value.join(", ") : "---"}</p>;
      default:
        return <p className={styles.tableTextarea}>{value || "---"}</p>;
    }
  };

  renderSubRow = row => {
    const { violations } = this.props;
    const currentViolation = violations.find(violation => violation.id === row.id);
    if (currentViolation && currentViolation.violations.length > 0)
      return(
        currentViolation.violations.map((violation) => (
          <div className={styles.subRow}>
            {
              this.subHeaders.map( cell => (
                <div key={cell.key} className={`${styles.tableCell} ${styles[cell.key]}`}>{this.renderDetail(cell.key, violation[cell.key])}</div>
              ))                                
            }
          </div>
        ))
      );
    else {
      return(
        <div className={styles.subRow}>                        {
            this.subHeaders.map( cell => (
              <div key={cell.key} className={`${styles.tableCell} ${styles[cell.key]}`}>{this.renderDetail(cell.key,"---")}</div>
            ))                                
          }
        </div>
      );
    }
  }

  renderDetail = (key, value) => {
    switch (key) {
      case "metric":
        return <p className={styles.detailMetrics}>{value}</p>;
      case "message":
        return <p className={styles.detailMessage}>{value}</p>;
      default:
        return <p className={styles.tableTextarea}>{value || "---"}</p>;
    }
  }

  render() {
    const { violations } = this.props;
    const { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TableHeader, TableExpandHeader , TableExpandRow, TableExpandedRow  } = DataTable;

    return (
      <DataTable
        rows={violations}
        headers={this.headers}
        render={({ rows, headers, getHeaderProps, getRowProps }) => (
          <TableContainer>
            <Table className={styles.tableContainer} sortable={"true"} useZebraStyles={false}>
              <TableHead>
                <TableRow className={styles.tableHeadRow}>
                  <TableExpandHeader />
                  {headers.map(header => (
                    <TableHeader
                      {...getHeaderProps({ header, className: `${styles.tableHeader} ${styles[header.key]}` })}
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className={styles.tableBody}>
                {rows.map((row, rowIndex) => (
                  <Fragment key={row.id}>
                    <TableExpandRow  key={row.id} {...getRowProps({ row })}>
                      {row.cells.map((cell, cellIndex) => (
                        <TableCell key={cell.id} style={{ padding: "0" }}>
                          <div className={styles.tableCell}>{this.renderCell(rowIndex, cellIndex, cell.value)}</div>
                        </TableCell>
                      ))}
                    </TableExpandRow>
                    {row.isExpanded && (
                      <TableExpandedRow colSpan={headers.length + 1}>
                        <div className={styles.tableSubHeaders}>
                          {this.subHeaders.map(header => (
                            <div className={`${styles.tableSubHeader} ${styles[header.key]}`}>
                              {header.header}
                            </div>
                          ))}
                        </div>
                          {this.renderSubRow(row)}
                      </TableExpandedRow>
                    )}
                  </Fragment>
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
