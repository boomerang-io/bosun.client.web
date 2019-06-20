import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"; //Removed "Legend"
//import CustomLegend from "./CustomLegend";
import CustomTooltip from "./CustomTooltip";
const colors = ["#047CC0", "#0cd455", "#f39200", "#f0430a", "#8206b3"];

// let lastDots = [];
export default class Example extends PureComponent {
  state = {
    lastDots: [],
    toggledLines: [],
    triggerRerender: []
  };

  static propTypes = {
    chartData: PropTypes.array.isRequired,
    higherValue: PropTypes.number,
    lines: PropTypes.array.isRequired
  };

  componentDidMount() {
    window.addEventListener("resize", this.rerenderLegend);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.rerenderLegend);
  }

  rerenderLegend = () => {
    this.setState({ triggerRerender: [] });
  };

  setLastDot = e => {
    const { lastDots } = this.state;
    const hasDot = lastDots.find(dot => dot.key === e.dataKey);
    if (e.index + 1 === this.props.chartData.length && !hasDot) {
      const dot = [].concat(this.state.lastDots, { y: e.cy, key: e.dataKey });
      this.setState({ lastDots: dot });
    }
    if (e.index + 1 === this.props.chartData.length && hasDot && hasDot.y !== e.cy) {
      const newLastDots = lastDots.filter(dot => dot.key !== hasDot.key).concat({ y: e.cy, key: e.dataKey });
      this.setState({ lastDots: newLastDots });
    }
  };

  toggleLine = value => {
    const selectedLine = this.state.toggledLines.find(line => line === value.payload.name);
    if (!selectedLine) {
      this.setState({ toggledLines: this.state.toggledLines.concat(value.dataKey) });
    } else {
      this.setState({ toggledLines: this.state.toggledLines.filter(line => line !== value.payload.name) });
    }
  };

  render() {
    const { chartData, lines } = this.props;
    return (
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <ResponsiveContainer width="100%" aspect={4 / 0.8} minHeight={100}>
          <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 90,
              left: 20,
              bottom: 5
            }}
          >
            <defs>
              <filter id="drop-shadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset dx="5" dy="5" result="offsetblur" />
                <feFlood flood-color="grey" />
                <feComposite in2="offsetblur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="1 0" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tickMargin={15} />
            {/* <YAxis allowDecimals={false} axisLine={false} tickLine={false} tickMargin={20} domain={[0, higherValue*1.2]} /> */}
            <YAxis allowDecimals={false} axisLine={false} tickLine={false} tickMargin={20} />
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend 
              onClick={this.toggleLine}
              content={
                <CustomLegend
                  toggleItem={this.toggleLine}
                  toggledItems={this.state.toggledLines}
                  lastDots={this.state.lastDots}
                />
              }
              align="right"
              layout="vertical"
              verticalAlign="middle"
              wrapperStyle={{display:"flex", height:"100%", paddingLeft:"2rem"}}
            /> */}
            {lines.map((line, index) => (
              <Line
                dot={this.setLastDot}
                filter="url(#drop-shadow)"
                type="monotone"
                dataKey={!this.state.toggledLines.find(selectedLine => selectedLine === line) ? line : ""}
                name={line}
                key={line}
                stroke={colors[index % colors.length]}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
