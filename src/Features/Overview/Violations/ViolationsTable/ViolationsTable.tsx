import React, { Component } from "react";
import moment from "moment";
import {
  Button,
  CodeSnippet,
  ComposedModal,
  DataTable,
  ModalFooter,
  ModalForm,
  ModalBody,
  Tag,
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
} from "@boomerang-io/carbon-addons-boomerang-react";
import copy from "copy-to-clipboard";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { isAccessibleEvent } from "@boomerang-io/utils";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './violationsTable.module.scss'... Remove this comment to see the full error message
import styles from "./violationsTable.module.scss";

type Props = {
    violations?: any[];
};

type State = any;

export class ViolationsTable extends Component<Props, State> {

  annotationsRef = React.createRef();

  state = { isModalOpen: false, selectedPolicyIndex: null };
  headers = [
    {
      header: "Policy",
      key: "policyName",
    },
    {
      header: "Violations",
      key: "nbrViolations",
    },
    {
      header: "Failed Definition Types",
      key: "policyDefinitionTypes",
    },
    {
      header: "Reference ID",
      key: "referenceId",
    },
    {
      header: "Activity Date",
      key: "policyActivityCreatedDate",
    },
  ];

  subHeaders = [
    {
      header: "Metrics",
      key: "metric",
    },
    {
      header: "Message",
      key: "message",
    },
  ];

  renderCell = (rowIndex: any, cellIndex: any, value: any) => {
    const column = this.headers[cellIndex];
    switch (column.header) {
      case "Activity Date":
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <time className={styles.tableTextarea}>{value ? moment(value).format("MMMM DD, YYYY") : "---"}</time>;
      case "Failed Definition Types":
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <p className={styles.tableTextarea}>{value && value.length ? value.join(", ") : "---"}</p>;
      default:
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <p className={styles.tableTextarea}>{value || "---"}</p>;
    }
  };

  renderSubRow = (row: any) => {
    const { violations } = this.props;
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const currentViolation = violations.find((violation) => violation.id === row.id);
    if (currentViolation && currentViolation.violations.length > 0)
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      return currentViolation.violations.map((violation: any) => <div className={styles.subRow}>
        {this.subHeaders.map((cell) => (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div key={cell.key} className={`${styles.tableCell} ${styles[cell.key]}`}>
            {this.renderDetail(cell.key, violation[cell.key])}
          </div>
        ))}
      </div>);
    else {
      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.subRow}>
          {this.subHeaders.map((cell) => (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div key={cell.key} className={`${styles.tableCell} ${styles[cell.key]}`}>
              {this.renderDetail(cell.key, "---")}
            </div>
          ))}
        </div>
      );
    }
  };

  renderDetail = (key: any, value: any) => {
    switch (key) {
      case "metric":
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <p className={styles.detailMetrics}>{value}</p>;
      case "message":
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <p className={styles.detailMessage}>{value}</p>;
      default:
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <p className={styles.tableTextarea}>{value || "---"}</p>;
    }
  };

  handleRowClick = (row: any) => {
    this.setState({
      isModalOpen: true,
      selectedPolicyIndex: row,
    });
  };

  render() {
    const { violations } = this.props;
    const { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TableHeader } = DataTable;
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const selectedViolation = violations[this.state.selectedPolicyIndex];
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ComposedModal
        isOpen={this.state.isModalOpen}
        composedModalProps={{ shouldCloseOnOverlayClick: true }}
        onCloseModal={() => this.setState({ isModalOpen: false })}
        modalHeaderProps={{ title: selectedViolation?.policyName }}
      >
        {() => (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ModalForm>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ModalBody>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <h2 className={styles.modalSectionTitle}>{`Violations (${
                selectedViolation?.violations?.length ?? 0
              })`}</h2>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <ul className={styles.modalLabels}>
                {(selectedViolation?.violations ?? [])?.map(({
                  metric,
                  message
                }: any, index: any) => (
                  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <li key={index}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <span>{metric} : </span>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <span style={{ fontStyle: "italic" }}>{message}</span>
                  </li>
                ))}
              </ul>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <h2 className={styles.modalSectionTitle}>Failed Definition Types</h2>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <p>
                {selectedViolation?.policyDefinitionTypes && selectedViolation?.policyDefinitionTypes.length
                  ? selectedViolation?.policyDefinitionTypes.join(", ")
                  : "---"}
              </p>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <h2 className={styles.modalSectionTitle}>Labels</h2>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <ul className={styles.modalLabels}>
                {Object.entries(selectedViolation?.labels ?? {})?.map((entry) => (
                  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <li key={entry[0]}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Tag type="purple">
                      {entry[0]}
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <span>:</span>
                      {entry[1]}
                    </Tag>
                  </li>
                ))}
              </ul>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <h2 className={styles.modalSectionTitle}>Reference Link</h2>
              {selectedViolation?.referenceLink ? (
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <a href={selectedViolation.referenceLink} alt="Reference link">
                  {selectedViolation.referenceLink}
                </a>
              ) : (
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p>No reference link provided</p>
              )}

              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <h2 className={styles.modalSectionTitle}>Reference ID</h2>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <p>{selectedViolation?.referenceId ?? "---"}</p>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <h2 className={styles.modalSectionTitle}>Created Date</h2>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <time>
                {selectedViolation?.createdDate
                  ? moment(selectedViolation.createdDate).format("MMMM DD, YYYY")
                  : "---"}
              </time>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <h2 className={styles.modalSectionTitle}>Annotations</h2>
              {selectedViolation?.annotations ? (
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <CodeSnippet
                  copyButtonDescription="Copy annotations to clipboard"
                  onClick={() => copy(JSON.stringify([selectedViolation?.annotations]))}
                  type="multi"
                >
                  {JSON.stringify([selectedViolation?.annotations], null, 1)}
                </CodeSnippet>
              ) : (
                "---"
              )}
            </ModalBody>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ModalFooter>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Button onClick={() => this.setState({ isModalOpen: false })} data-testid="close-violation-detail">
                Close
              </Button>
            </ModalFooter>
          </ModalForm>
        )}
      </ComposedModal>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <DataTable
        rows={violations}
        headers={this.headers}
        isSortable={true}
        render={({
          rows,
          headers,
          getHeaderProps,
          getRowProps
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
                    key={header.key}
                    {...getHeaderProps({ header, className: `${styles.tableHeader} ${styles[header.key]}` })}
                  >
                    {header.header}
                  </TableHeader>)}
                </TableRow>
              </TableHead>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <TableBody className={styles.tableBody}>
                {rows.map((row: any, rowIndex: any) => (
                  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <TableRow
                    className={styles.tableBodyRow}
                    key={row.id}
                    {...getRowProps({ row })}
                    onClick={() => this.handleRowClick(rowIndex)}
                    onKeyDown={(e: any) => isAccessibleEvent(e) && this.handleRowClick(rowIndex)}
                    tabIndex={0}
                    data-testid="violations-table-row"
                  >
                    {row.cells.map((cell: any, cellIndex: any) => (
                      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <TableCell key={cellIndex} style={{ padding: "0" }}>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
    </>;
  }
}

export default ViolationsTable;
