import React from "react";
import { useQuery } from "react-query";
import { ErrorDragon, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import FullPageHeader from "Components/FullPageHeader";
import TemplatesTable from "./TemplatesTable";
import { serviceUrl, resolver } from "Config/servicesConfig";
import styles from "./templates.module.scss";

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
        <FullPageHeader>
          <div>
            <p className={styles.supertitle}>These are the</p>
            <h1 className={styles.title}>Policy Templates</h1>
          </div>
        </FullPageHeader>
        <TemplatesTable data={templatesData} />
      </>
    );
  }

  return null;
}

export default TemplatesContainer;
