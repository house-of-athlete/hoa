import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { CloseButton } from "../close_button"
import { MobileNavScreen } from "./MobileNavScreen"
import { Transition, TransitionGroup } from "react-transition-group"
import isPropValid from "@emotion/is-prop-valid"

const timeout = 400

const Styled = styled.div`
  font-size: 1.0625rem;
  height: 100%;
  text-transform: uppercase;
`

const Header = styled.div`
  align-items: center;
  border-bottom: var(--mobile-nav-border);
  display: flex;
  height: var(--top-nav-height);
  padding: 0 var(--hoa-mobile-nav-side-padding);
`

const StyledCloseButton = styled(CloseButton)`
  height: 18px;
  left: calc(-1 * var(--clickable-area-padding));
  padding: var(--clickable-area-padding);
  position: relative;
  width: 18px;
`

const SlideContainer = styled(TransitionGroup, {
  shouldForwardProp: isPropValid,
})`
  display: grid;
  height: calc(100% - var(--top-nav-height));
  grid-auto-columns: 100%;
  grid-auto-flow: column;
  grid-template-rows: 100%;
  transform: translateX(${({ $index }) => -$index * 100}%);
  transition: transform ${timeout / 1000}s ease-in-out;
`

export const MobileNav = ({ convertNavItem, navigation, onHide }) => {
  useEffect(() => {
    const hide = () => {
      onHide()
    }

    window.addEventListener("resize", hide)

    return () => {
      window.removeEventListener("resize", hide)
    }
  }, [])

  const [navigationItemStack, setNavigationItemStack] = useState([
    { items: navigation.mobileItems },
  ])

  const navigate = subNav => {
    setNavigationItemStack(prev => [...prev, subNav])
  }

  const navigateBack = () => {
    setNavigationItemStack(prev => (prev.length > 1 ? prev.slice(0, -1) : prev))
  }

  return (
    <Styled>
      <Header>
        <StyledCloseButton alt="close" onClick={onHide} />
      </Header>

      <SlideContainer $index={navigationItemStack.length - 1}>
        {navigationItemStack.map((subNav, index) => (
          <Transition key={index} timeout={timeout}>
            <MobileNavScreen
              convertNavItem={convertNavItem}
              navigation={subNav}
              onNavigate={navigate}
              onNavigateBack={navigateBack}
              socialItems={navigation.socialItems}
            />
          </Transition>
        ))}
      </SlideContainer>
    </Styled>
  )
}

MobileNav.propTypes = {
  convertNavItem: PropTypes.func,
  navigation: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired,
}
