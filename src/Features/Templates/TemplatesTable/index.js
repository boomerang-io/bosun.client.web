import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Button, DataTable } from "@boomerang-io/carbon-addons-boomerang-react";
import { Add16 } from "@carbon/icons-react";
import styles from "./templatesTable.module.scss";

const headers = [
  {
    header: "Name",
    key: "name"
  },

  {
    header: "Description",
    key: "description"
  },
  {
    header: "Created Date",
    key: "createdDate"
  },
  {
    header: "Key",
    key: "key"
  }
];

TemplatesTable.propTypes = {
  data: PropTypes.array,
  definitions: PropTypes.array
};

export default function TemplatesTable(props) {
  let history = useHistory();
  const handleRowClick = row => {
    history.push(`/templates/edit/${row.id}`);
  };

  const handleCreateButtonClick = row => {
    history.push(`/templates/create`);
  };

  const renderCell = (cells, cellIndex, value) => {
    const column = headers[cellIndex];
    switch (column.header) {
      case "Name":
        return <p className={styles.tableTextarea}>{value}</p>;
      case "Description":
        return <p className={styles.tableTextarea}>{value || "---"}</p>;
      case "Key":
        return <p className={styles.tableTextarea}>{value}</p>;
      case "Created Date":
        return <time className={styles.tableTextarea}>{moment(value).format("MMM DD, YYYY - hh:mm a")}</time>;
      default:
        return value || "---";
    }
  };

  const { data } = props;
  const { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TableHeader } = DataTable;
  return (
    <div className={styles.container}>
      <Button
        className={styles.createButton}
        iconDescription="Create Template"
        onClick={handleCreateButtonClick}
        renderIcon={Add16}
        size="field"
      >
        Create Template
      </Button>
      <DataTable
        rows={data}
        headers={headers}
        isSortable={true}
        render={({ rows, headers, getHeaderProps }) => (
          <TableContainer>
            <Table className={styles.tableContainer} sortable={"true"} useZebraStyles={false}>
              <TableHead>
                <TableRow className={styles.tableHeadRow}>
                  {headers.map(header => (
                    <TableHeader
                      {...getHeaderProps({ header, className: `${styles.tableHeader} ${styles[header.key]}` })}
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className={styles.tableBody} data-testid="templates-tbody">
                {rows.map((row, rowIndex) => (
                  <TableRow key={row.id} className={styles.tableRow} onClick={() => handleRowClick(row)} data-testid="templates-table-row">
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
    </div>
  );
}
