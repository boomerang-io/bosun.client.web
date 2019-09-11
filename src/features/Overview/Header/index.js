import React, { Component } from "react";
import PropTypes from "prop-types";
import { ComboBox } from "@boomerang/carbon-addons-boomerang-react";
import styles from "./header.module.scss";

export class Header extends Component {
  static propTypes = {
    handleChangeTeam: PropTypes.func.isRequired,
    teams: PropTypes.array
  };

  render() {
    const { teams } = this.props;
    const { activeTeam } = this.props;

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
      <div className={styles.container}>
        <h2 className={styles.title}>Team</h2>
        <ComboBox
          id="team"
          onChange={this.props.handleChangeTeam}
          items={teamsList}
          initialSelectedItem={selectedTeam}
          placeholder="Select a team"
          title="Team"
        />
      </div>
    );
  }
}

export default Header;
