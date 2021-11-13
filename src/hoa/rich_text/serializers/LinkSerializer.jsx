import PropTypes from "prop-types"
import React from "react"
import { ExternalLink } from "../../links"

const LinkSerializer = ({ children, mark }) => (
  <ExternalLink href={mark.href}>{children}</ExternalLink>
)

LinkSerializer.propTypes = {
  children: PropTypes.node,
  mark: PropTypes.object.isRequired,
}

export default LinkSerializer
