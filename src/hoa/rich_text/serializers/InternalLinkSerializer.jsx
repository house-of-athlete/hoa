import PropTypes from "prop-types"
import React from "react"
import { CMSLink } from "../../links"

export const InternalLinkSerializer = ({ children, mark }) => {
  const [LinkComponent, props] = CMSLink.getInternalLink(mark.doc)

  return <LinkComponent {...props}>{children}</LinkComponent>
}

InternalLinkSerializer.propTypes = {
  children: PropTypes.node,
  mark: PropTypes.object.isRequired,
}
