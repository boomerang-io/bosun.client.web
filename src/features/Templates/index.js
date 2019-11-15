import React from "react";
import ErrorDragon from "components/ErrorDragon";
import LoadingAnimation from "components/Loading";
import FullPageHeader from "components/FullPageHeader";
import TemplatesTable from "./TemplatesTable";
import { SERVICE_PRODUCT_TEMPLATES_PATH } from "config/servicesConfig";
import useAxiosFetch from "utils/hooks/useAxios";
import styles from "./templates.module.scss";

export function TemplatesContainer() {
  //const history = useHistory();

  const templatesState = useAxiosFetch(`${SERVICE_PRODUCT_TEMPLATES_PATH}`);

  if (templatesState.isLoading) return <LoadingAnimation message="Just a moment, por favor" delay={0} />;

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
