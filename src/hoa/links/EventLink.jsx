import PropTypes from "prop-types"
import React from "react"

export const EventLink = ({ children, onClick, ...props }) => (
  <a
    href="#"
    onClick={event => {
      event.preventDefault()
      onClick()
    }}
    {...props}
  >
    {children}
  </a>
)

EventLink.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
}
