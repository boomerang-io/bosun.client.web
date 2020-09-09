import React from "react";
import { useQuery } from "react-query";
import { ErrorDragon, Loading, FeatureHeader, FeatureHeaderTitle, FeatureHeaderSubtitle } from "@boomerang-io/carbon-addons-boomerang-react";
import TemplatesTable from "./TemplatesTable";
import { serviceUrl, resolver } from "Config/servicesConfig";

export function TemplatesContainer() {

  const getTemplatesUrl = serviceUrl.getTemplates();
  const { data: templatesData, isLoading, error } = useQuery({
    queryKey: getTemplatesUrl,
    queryFn: resolver.query(getTemplatesUrl)
  });

  if (isLoading) return <Loading />;

  if (error) {
    return <ErrorDragon />;
  }

  if (templatesData) {
    return (
      <>
        <FeatureHeader
          includeBorder={false}
          header={
            <>
              <FeatureHeaderSubtitle>These are the</FeatureHeaderSubtitle>
              <FeatureHeaderTitle>Policy Templates</FeatureHeaderTitle>
            </>
          }
        />
        <TemplatesTable data={templatesData} />
      </>
    );
  }

  return null;
}

export default TemplatesContainer;
