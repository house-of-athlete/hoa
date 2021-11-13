import PropTypes from "prop-types"
import React from "react"
import { CMSLink } from "@hoa/hoa.ui.cms_link"

const InternalLinkSerializer = ({ children, mark }) => {
  const [LinkComponent, props] = CMSLink.getInternalLink(mark.doc)

  return <LinkComponent {...props}>{children}</LinkComponent>
}

InternalLinkSerializer.propTypes = {
  children: PropTypes.node,
  mark: PropTypes.object.isRequired,
}

export default InternalLinkSerializer
