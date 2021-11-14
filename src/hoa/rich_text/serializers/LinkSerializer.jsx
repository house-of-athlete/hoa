import PropTypes from "prop-types"
import React from "react"
import { ExternalLink } from "../../links"

export const LinkSerializer = ({ children, mark }) => (
  <ExternalLink href={mark.href}>{children}</ExternalLink>
)

LinkSerializer.propTypes = {
  children: PropTypes.node,
  mark: PropTypes.object.isRequired,
}
