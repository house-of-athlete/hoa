import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"
import { CloseButton } from "@hoa/hoa.ui.close_button"
import { MuxVideo } from "../mux_video"
import { PreventScrolling } from "@hoa/hoa.ui.prevent_scrolling"

const StyledCloseButton = styled(CloseButton)`
  --hoa-close-button-color: var(--hoa-video-modal-close-button-color, #fff);
`

export const VideoModal = ({ onClose, video }) => (
  <>
    <PreventScrolling />

    <div className="fixed flex flex-col inset-0 justify-center p-6 z-50">
      <div
        className="absolute inset-0"
        onClick={onClose}
        style={{
          backgroundColor: "var(--hoa-video-modal-backdrop-color, black)",
          opacity: "var(--hoa-video-modal-backdrop-opacity, 0.9)",
          zIndex: "-1",
        }}
      />

      <StyledCloseButton
        className="absolute p-2 right-4 top-4 w-4"
        onClick={onClose}
      />

      <MuxVideo autoPlay controls className="max-h-full w-full" video={video} />
    </div>
  </>
)

VideoModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  video: PropTypes.object.isRequired,
}
