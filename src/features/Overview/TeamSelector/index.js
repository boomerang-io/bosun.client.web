import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useFeature } from "flagged";
import { Formik } from "formik";
import * as Yup from "yup";
import { ComboBox, TextInput } from "@boomerang-io/carbon-addons-boomerang-react";
import { Button, ComposedModal, ModalHeader, ModalFooter, ModalBody, ToastNotification } from "carbon-components-react";
import { toast } from "react-toastify";
import { FeatureFlag } from "config/appConfig";
import { SERVICE_PRODUCT_TEAM_PATH } from "config/servicesConfig";
import { Add16 } from "@carbon/icons-react";
import styles from "./TeamSelector.module.scss";

TeamSelector.propTypes = {
  activeTeam: PropTypes.object,
  handleChangeTeam: PropTypes.func.isRequired,
  teams: PropTypes.array
};

export function TeamSelector({ activeTeam, handleChangeTeam, teams }) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const isStandaloneMode = useFeature(FeatureFlag.Standalone);
  const selectedTeam = activeTeam
    ? {
        id: activeTeam.id,
        label: activeTeam.name,
        name: activeTeam.name
      }
    : null;
  const teamsList = teams.map(team => ({
    id: team.id,
    label: team.name,
    name: team.name
  }));

  const teamNames = teams.map(team => team.name);

  async function createTeam(body) {
    try {
      await axios.post(SERVICE_PRODUCT_TEAM_PATH, body);
      toast(<ToastNotification kind="success" title="Team Created" subtitle="Team successfully created" caption="" />);
      setModalIsOpen(false);
    } catch (e) {
      toast(
        <ToastNotification
          kind="error"
          title="Team Creation Failure"
          subtitle="Request to create team failed"
          caption=""
        />
      );
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.inputs}>
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
          <Formik
            onSubmit={createTeam}
            initialValues={{ name: "" }}
            validateOnMount={false}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .required("Enter a name")
                .notOneOf(teamNames, "Name must be unique")
            })}
          >
            {formikProps => {
              const { isSubmitting, values, touched, errors, handleBlur, handleChange, handleSubmit } = formikProps;
              return (
                <>
                  <Button
                    renderIcon={Add16}
                    iconDescription="Add team"
                    onClick={() => setModalIsOpen(true)}
                    size="small"
                  >
                    Create Team
                  </Button>
                  <form onSubmit={handleSubmit}>
                    <ComposedModal onClose={() => setModalIsOpen(false)} open={modalIsOpen}>
                      <ModalHeader label="Add a new one" title="Create team" />
                      <ModalBody>
                        <div className={styles.modalForm}>
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
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={() => setModalIsOpen(false)} kind="secondary">
                          Cancel
                        </Button>
                        <Button disabled={!values.name || Object.values(errors).length || isSubmitting} type="submit">
                          Create
                        </Button>
                      </ModalFooter>
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
