import PropTypes from "prop-types"
import React from "react"
import { CSSTransition } from "react-transition-group"
import styled from "@emotion/styled"

const overlayOpacity = 0.5

const Styled = styled.div`
  .modal-bg-overlay-enter {
    opacity: 0;
  }

  .modal-bg-overlay-enter-active {
    opacity: ${overlayOpacity};
  }

  .modal-bg-overlay-exit {
    opacity: ${overlayOpacity};
  }

  .modal-bg-overlay-exit-active {
    opacity: 0;
  }
`

const Overlay = styled.div`
  background: var(--hoa-modal-background, purple);
  bottom: 0;
  left: 0;
  opacity: ${overlayOpacity};
  position: fixed;
  right: 0;
  top: 0;
  transition: opacity ${({ timeout }) => timeout / 1000}s ease-in-out;
  z-index: var(--hoa-modal-background-z-index, auto);
`

export const ModalBackground = ({ isExpanded, onClick, timeout = 400 }) => (
  <Styled>
    <CSSTransition
      classNames="modal-bg-overlay"
      in={isExpanded}
      mountOnEnter
      timeout={timeout}
      unmountOnExit
    >
      <Overlay onClick={onClick} timeout={timeout} />
    </CSSTransition>
  </Styled>
)

ModalBackground.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  timeout: PropTypes.number,
}
