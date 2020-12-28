import React, { PureComponent } from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'rech... Remove this comment to see the full error message
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"; //Removed "Legend"
//import CustomLegend from "./CustomLegend";
import CustomTooltip from "./CustomTooltip";
const colors = ["#047CC0", "#0cd455", "#f39200", "#f0430a", "#8206b3"];
type Props = {
    chartData: any[];
    higherValue?: number;
    lines: any[];
};
type State = any;
// let lastDots = [];
export default class ViolationsLineChart extends PureComponent<Props, State> {
    state = {
        lastDots: [],
        toggledLines: [],
        triggerRerender: [],
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
    setLastDot = (e: any) => {
        const { lastDots } = this.state;
        const hasDot = lastDots.find((dot) => (dot as any).key === e.dataKey);
        if (e.index + 1 === this.props.chartData.length && !hasDot) {
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            const dot = [].concat(this.state.lastDots, { y: e.cy, key: e.dataKey });
            this.setState({ lastDots: dot });
        }
        if (e.index + 1 === this.props.chartData.length && hasDot && (hasDot as any).y !== e.cy) {
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            const newLastDots = lastDots.filter((dot) => (dot as any).key !== hasDot.key).concat({ y: e.cy, key: e.dataKey });
            this.setState({ lastDots: newLastDots });
        }
    };
    toggleLine = (value: any) => {
        const selectedLine = this.state.toggledLines.find((line) => line === value.payload.name);
        if (!selectedLine) {
            this.setState({ toggledLines: this.state.toggledLines.concat(value.dataKey) });
        }
        else {
            this.setState({ toggledLines: this.state.toggledLines.filter((line) => line !== value.payload.name) });
        }
    };
    render() {
        const { chartData, lines } = this.props;
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return (<div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ResponsiveContainer width="99%" aspect={4 / 0.8}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LineChart data={chartData} margin={{
            top: 5,
            right: 90,
            left: 20,
            bottom: 5,
        }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <defs>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <filter id="drop-shadow">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <feOffset dx="5" dy="5" result="offsetblur"/>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <feFlood floodColor="grey"/>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <feComposite in2="offsetblur" operator="in"/>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <feMerge>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <feMergeNode />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <CartesianGrid strokeDasharray="1 0" vertical={false}/>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <XAxis dataKey="date" axisLine={false} tickLine={false} tickMargin={15}/>
            
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <YAxis allowDecimals={false} axisLine={false} tickLine={false} tickMargin={20}/>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Tooltip content={<CustomTooltip />}/>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {lines.map((line, index) => (<Line dot={this.setLastDot} filter="url(#drop-shadow)" type="monotone" dataKey={!this.state.toggledLines.find((selectedLine) => selectedLine === line) ? line : ""} name={line} key={line} stroke={colors[index % colors.length]}/>))}
          </LineChart>
        </ResponsiveContainer>
      </div>);
    }
}
