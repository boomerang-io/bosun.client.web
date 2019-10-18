import React from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import { DataTable } from "carbon-components-react";
import styles from "./policiesTable.module.scss";

const headers = [
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
    key: "rules"
  },
  {
    header: "Stage Gate Allocations",
    key: "stages"
  }
];

PoliciesTable.propTypes = {
  poicies: PropTypes.array,
  definitions: PropTypes.array
};

export default function PoliciesTable(props) {
  let history = useHistory();
  let params = useParams();
  const handleRowClick = row => {
    history.push(`/${params.teamName}/policy/edit/${row.id}`);
  };

  const renderCell = (cells, cellIndex, value) => {
    const column = headers[cellIndex];
    switch (column.header) {
      case "Name":
        return <p className={styles.tableTextarea}>{value}</p>;
      case "Definitions":
        return <p className={styles.tableTextarea}>{Array.isArray(value) ? value.length : "---"}</p>;
      case "Rules":
        const defValue = cells.find(cell => cell.id.includes("definitions")).value;
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

  const { policies } = props;
  const { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TableHeader } = DataTable;
  return (
    <DataTable
      rows={policies}
      headers={headers}
      isSortable={true}
      render={({ rows, headers, getHeaderProps }) => (
        <TableContainer>
          <Table className={styles.tableContainer} sortable={"true"} useZebraStyles={false}>
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
                <TableRow key={row.id} className={styles.tableRow} onClick={() => handleRowClick(row)}>
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
