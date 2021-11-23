import PropTypes from "prop-types"
import React, { useState } from "react"
import { EventLink } from "../links"
import { VideoModal } from "./VideoModal"

export const VideoModalLink = ({ children, className, video }) => {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <>
      <EventLink
        className={className}
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
  className: PropTypes.string,
  video: PropTypes.object.isRequired,
}
