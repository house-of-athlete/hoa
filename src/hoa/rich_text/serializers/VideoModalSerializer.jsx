import PropTypes from "prop-types"
import React from "react"
import { VideoModalLink } from "../../video_modal"

export const VideoModalSerializer = ({ children, mark }) => (
  <VideoModalLink video={mark.video}>{children}</VideoModalLink>
)

VideoModalSerializer.propTypes = {
  children: PropTypes.node,
  mark: PropTypes.object.isRequired,
}
