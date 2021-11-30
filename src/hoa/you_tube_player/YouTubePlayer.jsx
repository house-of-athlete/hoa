import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"

const Styled = styled.div`
  padding-bottom: 56.25%; // 16:9 aspect ratio
  position: relative;
  width: 100%;

  > iframe {
    left: 0;
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
  }
`

export const YouTubePlayer = ({ videoId }) => (
  <Styled>
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?autoplay=0&playsinline=1&modestbranding=1`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </Styled>
)

YouTubePlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
}
