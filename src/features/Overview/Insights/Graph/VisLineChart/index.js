import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeriesCanvas,
  LineMarkSeries,
  LineSeriesCanvas,
  LineSeries,
  Crosshair
} from "react-vis";

function getRandomData() {
  return new Array(50).fill(0).map((row, i) => ({
    x: i,
    y: Math.random() * 20,
    color: Math.random() * 10
  }));
}

const randomData = getRandomData();

const colorRanges = {
  typeA: ['#59E4EC', '#0D676C'],
  typeB: ['#EFC1E3', '#B52F93']
};

const drawModes = ['canvas', 'svg'];

export default class Example extends React.Component {
  state = {
    drawMode: 0,
    data: randomData,
    colorType: 'typeA',
    strokeWidth: 1,
    showMarks: true,
    value: false,
    hideComponent: false
  };

  render() {
    const {
      colorType,
      drawMode,
      data,
      hideComponent,
      strokeWidth,
      showMarks,
      value
    } = this.state;
    const lineSeriesProps = {
      animation: true,
      className: 'mark-series-example',
      sizeRange: [5, 15],
      color: colorType === 'typeA' ? '#0D676C' : '#B52F93',
      colorRange: colorRanges[colorType],
      opacityType: 'literal',
      strokeWidth,
      data,
      onNearestX: d => this.setState({value: d})
    };
    const SVGComponent = showMarks ? LineMarkSeries : LineSeries;
    const CanvasComponent = showMarks ? LineMarkSeriesCanvas : LineSeriesCanvas;

    const mode = drawModes[drawMode];
    return (
      <div className="canvas-wrapper">
        <div className="canvas-example-controls">
        </div>
        {!hideComponent && (
          <XYPlot
            onMouseLeave={() => this.setState({value: false})}
            width={600}
            height={300}
          >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            {mode === 'canvas' && <CanvasComponent {...lineSeriesProps} />}
            {mode === 'svg' && <SVGComponent {...lineSeriesProps} />}
            {value && <Crosshair values={[value]} />}
          </XYPlot>
        )}
      </div>
    );
  }
}