import React from "react";
import PropTypes from "prop-types";
import { ComboBox } from "carbon-components-react";
import styles from "./TeamSelector.module.scss";

TeamSelector.propTypes = {
  activeTeam: PropTypes.object,
  handleChangeTeam: PropTypes.func.isRequired,
  teams: PropTypes.array
};

export function TeamSelector({ activeTeam, handleChangeTeam, teams }) {
  const selectedTeam = activeTeam
    ? {
        id: activeTeam.id,
        label: activeTeam.boomerangTeamName,
        name: activeTeam.boomerangTeamShortname
      }
    : null;
  const teamsList = teams.map(team => ({
    id: team.id,
    label: team.boomerangTeamName,
    name: team.boomerangTeamShortname
  }));

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Team</h2>
      <ComboBox
        id="team"
        onChange={handleChangeTeam}
        items={teamsList}
        initialSelectedItem={selectedTeam}
        placeholder="Select a team"
        title="Team"
      />
    </section>
  );
}

export default TeamSelector;
