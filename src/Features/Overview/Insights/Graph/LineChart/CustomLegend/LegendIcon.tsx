import React from "react";

type Props = {
    className?: string;
    strokeColor?: string;
};

const LegendIcon = ({ className, strokeColor }: Props) => {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="10 0 13 28"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <path
        strokeWidth="4"
        fill="none"
        stroke={strokeColor}
        d="M0,16h10.666666666666666
          A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
          H32M21.333333333333332,16
          A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
        className="recharts-legend-icon"
      />
    </svg>
  );
};

export default LegendIcon;
