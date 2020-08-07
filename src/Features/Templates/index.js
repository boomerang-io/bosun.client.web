import React from "react";
import { ErrorDragon, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import FullPageHeader from "Components/FullPageHeader";
import TemplatesTable from "./TemplatesTable";
import { SERVICE_PRODUCT_TEMPLATES_PATH } from "Config/servicesConfig";
import useAxiosFetch from "Utils/hooks/useAxios";
import styles from "./templates.module.scss";

export function TemplatesContainer() {
  const templatesState = useAxiosFetch(`${SERVICE_PRODUCT_TEMPLATES_PATH}`);

  if (templatesState.isLoading) return <Loading />;

  if (templatesState.error) {
    return <ErrorDragon />;
  }

  if (templatesState.data) {
    return (
      <>
        <FullPageHeader>
          <div>
            <p className={styles.supertitle}>These are the</p>
            <h1 className={styles.title}>Policy Templates</h1>
          </div>
        </FullPageHeader>
        <TemplatesTable data={templatesState.data} />
      </>
    );
  }

  return null;
}

export default TemplatesContainer;
