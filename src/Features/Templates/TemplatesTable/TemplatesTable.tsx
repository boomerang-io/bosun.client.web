import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useHistory } from "react-router-dom";
import moment from "moment";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { Button, DataTable } from "@boomerang-io/carbon-addons-boomerang-react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@car... Remove this comment to see the full error message
import { Add16 } from "@carbon/icons-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/appConfig' or its corre... Remove this comment to see the full error message
import { appLink } from "Config/appConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './templatesTable.module.scss' ... Remove this comment to see the full error message
import styles from "./templatesTable.module.scss";

const headers = [
  {
    header: "Name",
    key: "name",
  },

  {
    header: "Description",
    key: "description",
  },
  {
    header: "Created Date",
    key: "createdDate",
  },
  {
    header: "Key",
    key: "key",
  },
];

type Props = {
    data?: any[];
    definitions?: any[];
};

export default function TemplatesTable(props: Props) {
  let history = useHistory();
  const handleRowClick = (row: any) => {
    history.push(appLink.editTemplate({ templateId: row.id }));
  };

  const handleCreateButtonClick = (row: any) => {
    history.push(appLink.createTemplate());
  };

  const renderCell = (cells: any, cellIndex: any, value: any) => {
    const column = headers[cellIndex];
    switch (column.header) {
      case "Name":
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <p className={styles.tableTextarea}>{value}</p>;
      case "Description":
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <p className={styles.tableTextarea}>{value || "---"}</p>;
      case "Key":
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <p className={styles.tableTextarea}>{value}</p>;
      case "Created Date":
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <time className={styles.tableTextarea}>{value ? moment(value).format("MMMM DD, YYYY") : "---"}</time>;
      default:
        return value || "---";
    }
  };

  const { data } = props;
  const { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TableHeader } = DataTable;
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Button
        className={styles.createButton}
        iconDescription="Create Template"
        onClick={handleCreateButtonClick}
        renderIcon={Add16}
        size="field"
      >
        Create Template
      </Button>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <DataTable
        rows={data}
        headers={headers}
        isSortable={true}
        render={({
          rows,
          headers,
          getHeaderProps
        }: any) => (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <TableContainer>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Table isSortable className={styles.tableContainer} useZebraStyles={false}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <TableHead>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <TableRow className={styles.tableHeadRow}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  {headers.map((header: any) => <TableHeader
                    {...getHeaderProps({ header, className: `${styles.tableHeader} ${styles[header.key]}` })}
                  >
                    {header.header}
                  </TableHeader>)}
                </TableRow>
              </TableHead>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <TableBody className={styles.tableBody} data-testid="templates-tbody">
                {rows.map((row: any, rowIndex: any) => (
                  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <TableRow
                    key={row.id}
                    className={styles.tableRow}
                    onClick={() => handleRowClick(row)}
                    data-testid="templates-table-row"
                  >
                    {row.cells.map((cell: any, cellIndex: any) => (
                      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <TableCell key={`${cell.id}-${cellIndex}`} style={{ padding: "0" }}>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
