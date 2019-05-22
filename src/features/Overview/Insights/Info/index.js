import React, { Component } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { actions } from "State/teamMembers";
// import { actions as userActions } from "State/user";
// import LoadingAnimation from "Components/Loading";
import { Tile } from "carbon-components-react";
import "./styles.scss";

export class Info extends Component {
  static propTypes = {
    info: PropTypes.object
  };

  componentDidMount() {
    // if (this.props) this.fetchMembers();
  }

  fetchMembers() {
    // this.props.actions.fetchMembers(`${BASE_SERVICE_ENV_URL}/launchpad/teams/${this.props.team.id}/members`);
  }

  render() {
    const { info } = this.props;
    return (
      <Tile
        style={{
          display: "flex",
          width: "100%",
          height: "10rem",
          alignItems: "center",
          padding: "0"
        }}
      >
        <div className="b-tile-info__counter" style={{ color: info.type === "gates" ? "#047cc0" : "#ffaa9d" }}>
          {info.count}
        </div>
        <div className="b-tile-info__divider" />
        <div className="c-tile-info__text">
          <h3 className="b-tile-info__title">{info.title}</h3>
          <p className="b-tile-info__content">{info.content}</p>
        </div>
      </Tile>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     isFetching: state.members.isFetching,
//     members: state.members.data,
//     status: state.members.status,
//     userId: state.user.data.id
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     actions: bindActionCreators(actions, dispatch),
//     userActions: bindActionCreators(userActions, dispatch)
//   };
// };

export default Info;
