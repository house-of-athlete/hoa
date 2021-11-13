import PropTypes from "prop-types"
import React, { useState } from "react"
import { EventLink } from "../links"
import { VideoModal } from "./VideoModal"

export const VideoModalLink = ({ children, video }) => {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <>
      <EventLink
        onClick={() => {
          setModalOpen(true)
        }}
      >
        {children}
      </EventLink>

      {isModalOpen && (
        <VideoModal
          onClose={() => {
            setModalOpen(false)
          }}
          video={video}
        />
      )}
    </>
  )
}

VideoModalLink.propTypes = {
  children: PropTypes.node,
  video: PropTypes.object.isRequired,
}
