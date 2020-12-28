import React from "react";
import { useMutation, queryCache } from "react-query";
import { useFeature } from "flagged";
import { Formik } from "formik";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'yup'... Remove this comment to see the full error message
import * as Yup from "yup";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { ComboBox, TextInput, Button, ComposedModal, ModalFooter, ModalBody, ModalForm, Loading, InlineNotification, notify, ToastNotification } from "@boomerang-io/carbon-addons-boomerang-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/appConfig' or its corre... Remove this comment to see the full error message
import { FeatureFlag } from "Config/appConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Config/servicesConfig' or its ... Remove this comment to see the full error message
import { serviceUrl, resolver } from "Config/servicesConfig";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@car... Remove this comment to see the full error message
import { Add16 } from "@carbon/icons-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './TeamSelector.module.scss' or... Remove this comment to see the full error message
import styles from "./TeamSelector.module.scss";

type Props = {
    activeTeam?: any;
    handleChangeTeam: (...args: any[]) => any;
    teams?: any[];
};

export function TeamSelector({ activeTeam, handleChangeTeam, teams }: Props) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const isStandaloneMode = useFeature(FeatureFlag.Standalone);
  const cancelRequestRef = React.useRef();

  const [createTeamMutation, { isLoading: createIsLoading, error: createError }] = useMutation(
    (args) => {
      const { promise, cancel } = resolver.postCreateTeam(args);
      cancelRequestRef.current = cancel;
      return promise;
    },
    {
      onSuccess: () => queryCache.invalidateQueries(serviceUrl.getTeams()),
    }
  );

  const selectedTeam = activeTeam
    ? {
        id: activeTeam.id,
        label: activeTeam.name,
        name: activeTeam.name
      }
    : null;
  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  const teamsList = teams.map(team => ({
    id: team.id,
    label: team.name,
    name: team.name
  }));

  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  const teamNames = teams.map(team => team.name);

  async function createTeam(body: any) {
    try {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ body: any; }' is not assignabl... Remove this comment to see the full error message
      await createTeamMutation({body});
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      notify(<ToastNotification kind="success" title="Team Created" subtitle="Team successfully created" />);
      setModalIsOpen(false);
    } catch (e) {
      notify(
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ToastNotification
          kind="error"
          title="Team Creation Failure"
          subtitle="Request to create team failed"
        />
      );
    }
  }

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <section className={styles.container}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className={styles.inputs}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ComboBox
          id="team"
          onChange={handleChangeTeam}
          items={teamsList}
          labelText="Team"
          initialSelectedItem={selectedTeam}
          placeholder="Select a team"
          title="Team"
        />
        {isStandaloneMode ? (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Formik
            onSubmit={createTeam}
            initialValues={{ name: "" }}
            validateOnMount={false}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .required("Enter a name")
                .notOneOf(teamNames, "Name must be unique")
            })}
            enableReinitialize
          >
            {formikProps => {
              const { isSubmitting, values, touched, errors, handleBlur, handleChange, handleSubmit, resetForm } = formikProps;
              return (
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Button
                    renderIcon={Add16}
                    iconDescription="Add team"
                    onClick={() => setModalIsOpen(true)}
                    size="small"
                  >
                    Create Team
                  </Button>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <form onSubmit={handleSubmit}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <ComposedModal 
                     composedModalProps={{ containerClassName: styles.modalForm }}
                      modalHeaderProps={{
                        title: "Create team",
                        subtitle: "Add a new one",
                      }}
                      onCloseModal={() => { 
                        resetForm();
                        setModalIsOpen(false);
                      }} 
                      isOpen={modalIsOpen}>
                    {
                      () => (
                        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <ModalForm>
                          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                          <ModalBody>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            { createIsLoading && <Loading />}
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <TextInput
                              id="name"
                              placeholder="Enter team name"
                              labelText="Name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              invalid={errors.name && touched.name}
                              invalidText={errors.name}
                              value={values.name}
                            />
                          </ModalBody>
                          { createError && 
                            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <InlineNotification
                              lowContrast
                              kind="error"
                              title="Something's Wrong"
                              subtitle="Request to create version failed"
                            /> 
                          }
                          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                          <ModalFooter>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <Button onClick={() =>setModalIsOpen(false)} kind="secondary">
                              Cancel
                            </Button>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <Button disabled={!values.name || Object.values(errors).length || isSubmitting} type="submit">
                              { createIsLoading ? "Creating" :  createError? "Try Again" : "Create" }
                            </Button>
                          </ModalFooter>
                        </ModalForm>
                      )
                    }
                    </ComposedModal>
                  </form>
                </>
              );
            }}
          </Formik>
        ) : null}
      </div>
    </section>
  );
}

export default TeamSelector;
