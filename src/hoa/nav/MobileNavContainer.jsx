import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import StoreContext from "../context/StoreContext"
import styled from "@emotion/styled"
import ModalBackground from "../modals/ModalBackground"
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

const MobileNavContainer = () => {
  const { overlayStore } = useContext(StoreContext)
  const { isMobileNavExpanded } = overlayStore

  const hide = () => {
    overlayStore.hide()
  }

  return (
    <Styled>
      {isMobileNavExpanded && <PreventScrolling />}

      <ModalBackground isExpanded={isMobileNavExpanded} onClick={hide} />

      <CSSTransition
        classNames="mobile-nav-transition-drawer"
        in={isMobileNavExpanded}
        mountOnEnter
        timeout={timeout}
        unmountOnExit
      >
        <FixedContainer>
          <MobileNav />
        </FixedContainer>
      </CSSTransition>
    </Styled>
  )
}

MobileNavContainer.propTypes = {}

export default observer(MobileNavContainer)
