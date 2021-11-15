import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"
import { ModalBackground } from "../../vendor/hoa/modal"
import { CSSTransition } from "react-transition-group"
import MobileNav from "./MobileNav"
import { PreventScrolling } from "../../vendor/hoa/prevent_scrolling"

const timeout = 400

const Styled = styled.div`
  .mobile-nav-transition-drawer-enter {
    transform: translateX(-100%);
  }

  .mobile-nav-transition-drawer-enter-active {
    transform: translateX(0);
  }

  .mobile-nav-transition-drawer-exit {
    transform: translateX(0);
  }

  .mobile-nav-transition-drawer-exit-active {
    transform: translateX(-100%);
  }
`

const FixedContainer = styled.div`
  background: rgb(244, 244, 244);
  bottom: 0;
  left: 0;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  transition: transform ${timeout / 1000}s ease-in-out;
  will-change: transform;

  @media (max-width: 479px) {
    width: 100%;
  }

  @media (min-width: 480px) {
    width: 400px;
  }
`

const MobileNavContainer = ({
  convertNavItem,
  isExpanded,
  navigation,
  onHide,
}) => (
  <Styled>
    {isExpanded && <PreventScrolling />}

    <ModalBackground isExpanded={isExpanded} onClick={onHide} />

    <CSSTransition
      classNames="mobile-nav-transition-drawer"
      in={isExpanded}
      mountOnEnter
      timeout={timeout}
      unmountOnExit
    >
      <FixedContainer>
        <MobileNav
          convertNavItem={convertNavItem}
          navigation={navigation}
          onHide={onHide}
        />
      </FixedContainer>
    </CSSTransition>
  </Styled>
)

MobileNavContainer.propTypes = {
  convertNavItem: PropTypes.func,
  isExpanded: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired,
}

export default MobileNavContainer
