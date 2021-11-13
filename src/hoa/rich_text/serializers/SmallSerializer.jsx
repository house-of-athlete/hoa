import PropTypes from "prop-types"
import React from "react"

const SmallSerializer = ({ children }) => <small>{children}</small>

SmallSerializer.propTypes = {
  children: PropTypes.node,
}

export default SmallSerializer
