import PropTypes from "prop-types"
import React from "react"
import BlockContent from "@sanity/block-content-to-react"

const BlockRenderer = props => {
  const {
    node: { style = "normal" },
  } = props

  switch (style) {
    case "title":
      return <p className="hoa-title">{props.children}</p>

    default:
      return BlockContent.defaultSerializers.types.block(props)
  }
}

BlockRenderer.propTypes = {
  children: PropTypes.node,
  node: PropTypes.object,
}

export default BlockRenderer
