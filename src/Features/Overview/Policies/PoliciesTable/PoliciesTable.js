import React from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { DataTable } from "@boomerang-io/carbon-addons-boomerang-react";
import { appLink } from "Config/appConfig";
import styles from "./policiesTable.module.scss";

const headers = [
  {
    header: "Name",
    key: "name",
  },

  {
    header: "Definitions",
    key: "definitions",
  },
  {
    header: "Rules",
    key: "rules",
  },
  {
    header: "Created Date",
    key: "createdDate",
  },
];

PoliciesTable.propTypes = {
  poicies: PropTypes.array,
  definitions: PropTypes.array,
};

export default function PoliciesTable(props) {
  let history = useHistory();
  let params = useParams();
  const handleRowClick = (row) => {
    history.push(appLink.editPolicy({ teamId: params.teamId, policyId: row.id }));
  };

  const renderCell = (cells, cellIndex, value) => {
    const column = headers[cellIndex];
    switch (column.header) {
      case "Name":
        return <p className={styles.tableTextarea}>{value}</p>;
      case "Definitions":
        return <p className={styles.tableTextarea}>{Array.isArray(value) ? value.length : "---"}</p>;
      case "Created Date":
        return <time className={styles.tableTextarea}>{value ? moment(value).format("MMMM DD, YYYY") : "---"}</time>;
      case "Rules":
        const defValue = cells.find((cell) => cell.id.includes("definitions")).value;
        return (
          <p className={styles.tableTextarea}>
            {Array.isArray(defValue)
              ? defValue.reduce((accum, definition) => {
                  accum += definition.rules.length;
                  return accum;
                }, 0)
              : "---"}
          </p>
        );

      default:
        return value || "---";
    }
  };

  const { policies } = props;
  const { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TableHeader } = DataTable;
  return (
    <DataTable
      rows={policies}
      headers={headers}
      isSortable={true}
      render={({ rows, headers, getHeaderProps }) => (
        <TableContainer>
          <Table isSortable className={styles.tableContainer} useZebraStyles={false}>
            <TableHead>
              <TableRow className={styles.tableHeadRow}>
                {headers.map((header) => (
                  <TableHeader
                    {...getHeaderProps({ header, className: `${styles.tableHeader} ${styles[header.key]}` })}
                  >
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody} data-testid="policies-tbody">
              {rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  className={styles.tableRow}
                  onClick={() => handleRowClick(row)}
                  data-testid="policies-table-row"
                >
                  {row.cells.map((cell, cellIndex) => (
                    <TableCell key={`${cell.id}-${cellIndex}`} style={{ padding: "0" }}>
                      <div className={styles.tableCell}>{renderCell(row.cells, cellIndex, cell.value)}</div>
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
