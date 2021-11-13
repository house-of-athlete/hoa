import PropTypes from "prop-types"
import React from "react"
import { VideoModalLink } from "@hoa/hoa.ui.video_modal"

const VideoModalSerializer = ({ children, mark }) => (
  <VideoModalLink video={mark.video}>{children}</VideoModalLink>
)

VideoModalSerializer.propTypes = {
  children: PropTypes.node,
  mark: PropTypes.object.isRequired,
}

export default VideoModalSerializer
