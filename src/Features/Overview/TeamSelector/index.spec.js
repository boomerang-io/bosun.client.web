import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { TeamSelector } from "./index";

const mockfn = jest.fn();
const teams = [
  {
    id: "5a8b331e262a70306622df73",
    name: "ATT",
    higherLevelGroupId: "59aebcf47424530fce952fa2",
    ucdApplicationId: "96c22f37-5443-4bf5-83bb-7ce90deec820",
    isActive: true,
    audits: [
      {
        auditerId: null,
        date: 1519072030853,
        note: "CI-Team created"
      }
    ],
    boomerangTeamName: "AT&T MIL Mobile@Scale",
    boomerangTeamShortname: "ms-att-mil"
  }
];

describe("TeamSelector --- Snapshot", () => {
  it("Capturing Snapshot of TeamSelector", () => {
    const renderedValue = renderer.create(<TeamSelector handleChangeTeam={mockfn} teams={teams} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe("TeamSelector --- Shallow render", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TeamSelector handleChangeTeam={mockfn} teams={teams} />);
  });

  it("Render the DUMB component", () => {
    expect(wrapper.length).toEqual(1);
  });
});
