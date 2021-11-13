import PropTypes from "prop-types"
import React from "react"
import { EventLink } from "@hoa/hoa.ui.event_link"
import classNames from "classnames"

export const CloseButton = ({ className, onClick }) => (
  <EventLink
    className={classNames(className, "block box-content")}
    onClick={onClick}
  >
    <svg
      className="max-w-full"
      width="18px"
      height="18px"
      viewBox="0.9751065969467163 1.024845004081726 16.056758880615234 15.943411827087402"
      version="1.1"
    >
      <g
        id="close"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          transform="translate(0.000000, 1.000000)"
          fill="var(--hoa-close-button-color, purple)"
          fillRule="nonzero"
          id="Rectangle"
        >
          <rect
            transform="translate(8.859631, 7.909370) rotate(-45.000000) translate(-8.859631, -7.909370) "
            x="-1.63486545"
            y="7.25346498"
            width="20.988992"
            height="1.3118095"
          ></rect>
          <rect
            transform="translate(9.147449, 8.083840) rotate(45.000000) translate(-9.147449, -8.083840) "
            x="-1.34690078"
            y="7.42793976"
            width="20.9886994"
            height="1.31179996"
          ></rect>
        </g>
      </g>
    </svg>
  </EventLink>
)

CloseButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}
