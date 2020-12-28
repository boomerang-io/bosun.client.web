import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { DataTable } from "@boomerang-io/carbon-addons-boomerang-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/appConfig' or its corre... Remove this comment to see the full error message
import { appLink } from "Config/appConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './policiesTable.module.scss' o... Remove this comment to see the full error message
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

type Props = {
    poicies?: any[];
    definitions?: any[];
};

export default function PoliciesTable(props: Props) {
  let history = useHistory();
  let params = useParams();
  const handleRowClick = (row: any) => {
    history.push(appLink.editPolicy({ teamId: params.teamId, policyId: row.id }));
  };

  const renderCell = (cells: any, cellIndex: any, value: any) => {
    const column = headers[cellIndex];
    switch (column.header) {
      case "Name":
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <p className={styles.tableTextarea}>{value}</p>;
      case "Definitions":
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <p className={styles.tableTextarea}>{Array.isArray(value) ? value.length : "---"}</p>;
      case "Created Date":
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <time className={styles.tableTextarea}>{value ? moment(value).format("MMMM DD, YYYY") : "---"}</time>;
      case "Rules":
        const defValue = cells.find((cell: any) => cell.id.includes("definitions")).value;
        return (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'policies' does not exist on type 'Props'... Remove this comment to see the full error message
  const { policies } = props;
  const { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TableHeader } = DataTable;
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <DataTable
      rows={policies}
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
            <TableBody className={styles.tableBody} data-testid="policies-tbody">
              {rows.map((row: any, rowIndex: any) => (
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <TableRow
                  key={row.id}
                  className={styles.tableRow}
                  onClick={() => handleRowClick(row)}
                  data-testid="policies-table-row"
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
  );
}
