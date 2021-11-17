import PropTypes from "prop-types"
import React from "react"
import { CMSLink } from "../../links"

export const InternalLinkSerializer = ({ children, mark }) => {
  // inconsistent naming "doc" vs "document"
  const { doc, ...link } = mark
  link.document = doc

  return <CMSLink link={link}>{children}</CMSLink>
}

InternalLinkSerializer.propTypes = {
  children: PropTypes.node,
  mark: PropTypes.object.isRequired,
}
