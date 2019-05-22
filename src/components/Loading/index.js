import React from "react";
import ReactDom from "react-dom";
import cx from "classnames";
import LoadingAnimation from "@boomerang/boomerang-components/lib/LoadingAnimation";
import "./loading.scss";

const Loading = ({ centered = true }) => {
  return centered ? (
    ReactDom.createPortal(
      <div className={cx("c-loading", { "--centered": centered })}>
        <LoadingAnimation theme="bmrg-white" />
      </div>,
      document.body
    )
  ) : (
    <div className="c-loading">
      <LoadingAnimation theme="bmrg-white" />
    </div>
  );
};

export default Loading;
