import PropTypes from "prop-types"
import React from "react"

export const ExternalLink = ({ children, className, href, onClick }) => (
  <a
    className={className}
    href={href}
    onClick={onClick}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
)

ExternalLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}
