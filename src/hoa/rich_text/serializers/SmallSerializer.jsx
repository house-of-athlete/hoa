import PropTypes from "prop-types"
import React from "react"

export const SmallSerializer = ({ children }) => <small>{children}</small>

SmallSerializer.propTypes = {
  children: PropTypes.node,
}
