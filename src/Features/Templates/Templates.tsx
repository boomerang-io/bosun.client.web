import React from "react";
import { useQuery } from "react-query";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { ErrorMessage, SkeletonPlaceholder, DataTableSkeleton, FeatureHeader, FeatureHeaderTitle, FeatureHeaderSubtitle } from "@boomerang-io/carbon-addons-boomerang-react";
import TemplatesTable from "./TemplatesTable";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/servicesConfig' or its ... Remove this comment to see the full error message
import { serviceUrl, resolver } from "Config/servicesConfig";

export function TemplatesContainer() {

  const getTemplatesUrl = serviceUrl.getTemplates();
  const { data: templatesData, isLoading, error } = useQuery({
    queryKey: getTemplatesUrl,
    queryFn: resolver.query(getTemplatesUrl)
  });

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <FeatureHeader
        includeBorder={false}
        header={
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <FeatureHeaderSubtitle>These are the</FeatureHeaderSubtitle>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <FeatureHeaderTitle>Policy Templates</FeatureHeaderTitle>
          </>
        }
      />
      {
        isLoading ?
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div style={{padding:"2rem"}}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <SkeletonPlaceholder style={{maxHeight:"2.5rem", marginBottom:"1rem", width:"100%"}}/>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <DataTableSkeleton columnCount={4}/>
        </div>
        :
        error ?
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div style={{marginTop:"2rem"}}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ErrorMessage />
          </div>
        :
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <TemplatesTable data={templatesData} />
      }
    </>
  );
}

export default TemplatesContainer;
