import PropTypes from "prop-types"
import React, { useContext } from "react"
import styled from "@emotion/styled"
import CartIconLink from "../cart/CartIconLink"
import logo from "../../images/hoa_logo_dark.svg"
import { Link } from "gatsby"
import CMSContext from "../context/CMSContext"
import { ExternalLink, EventLink } from "../../vendor/hoa/links"
import hamburger from "../../images/hamburger.svg"
import StoreContext from "../context/StoreContext"
import { MOBILE_NAV_MAX, DESKTOP_NAV_MIN } from "../CSSVariables"
import { observer } from "mobx-react-lite"
import { accountPath } from "../../lib/urls"
import LazyAutocomplete from "../search/LazyAutocomplete"

const renderItem = (item, { product }) => {
  switch (item._type) {
    case "externalLinkNavItem":
      return (
        <ExternalLink key={item._key} href={item.url}>
          {item.name}
        </ExternalLink>
      )

    case "internalLinkNavItem":
      return (
        <Link
          key={item._key}
          activeClassName="active-link"
          className={
            item.productTypes?.some(t => t === product?.productType)
              ? "active-link"
              : null
          }
          partiallyActive={true}
          to={item.document.path.current}
        >
          {item.name}
        </Link>
      )

    default:
      throw new Error(`unknown nav item type: ${item._type}`)
  }
}

const Styled = styled.header`
  --item-gap: 30px;

  align-items: center;
  display: grid;
  height: var(--top-nav-height);
  font-size: 0.8125rem;
  grid-template-columns: 1fr auto 1fr;
  line-height: 0;
  padding: 0 var(--default-margin);
`

const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const DesktopNavContainer = styled.div`
  align-items: center;
  display: flex;
  margin-right: var(--item-gap);
  text-transform: uppercase;

  @media (max-width: ${MOBILE_NAV_MAX}px) {
    display: none;
  }

  .active-link {
    font-weight: var(--weight-slight-bold);
  }

  > :not(:first-of-type) {
    margin-left: var(--item-gap);
  }
`

const MobileHamburger = styled(EventLink)`
  @media (max-width: ${MOBILE_NAV_MAX}px) {
    display: inline-block;
    padding: var(--clickable-area-padding);
    position: relative;
    left: calc(-1 * var(--clickable-area-padding));
  }

  @media (min-width: ${DESKTOP_NAV_MIN}px) {
    display: none;
  }
`

const LeftDesktopNav = styled(DesktopNavContainer)``

const RightDesktopNav = styled(DesktopNavContainer)`
  justify-content: flex-end;
`

const LogoImg = styled.img`
  @media (max-width: ${props => props.theme.phoneMax}) {
    width: 60px;
  }

  @media (min-width: ${props => props.theme.tabletMin}) {
    width: 70px;
  }
`

const TopNav = ({ product }) => {
  const {
    customerStore: { customer },
    overlayStore,
  } = useContext(StoreContext)
  const { navigation } = useContext(CMSContext)

  return (
    <Styled>
      <div>
        <MobileHamburger
          onClick={() => {
            overlayStore.showMobileNav()
          }}
        >
          <img src={hamburger} alt="" />
        </MobileHamburger>

        <LeftDesktopNav>
          {navigation.desktopLeftItems?.map(item =>
            renderItem(item, { product })
          )}
        </LeftDesktopNav>
      </div>

      <Link to="/">
        <LogoImg src={logo} alt="Company logo" />
      </Link>

      <RightContainer>
        <RightDesktopNav>
          {navigation.desktopRightItems?.map(item =>
            renderItem(item, { product })
          )}

          {customer && (
            <Link
              activeClassName="active-link"
              partiallyActive={true}
              to={accountPath()}
            >
              Account
            </Link>
          )}
        </RightDesktopNav>

        <LazyAutocomplete />
        <CartIconLink />
      </RightContainer>
    </Styled>
  )
}

TopNav.propTypes = {
  product: PropTypes.object,
}

export default observer(TopNav)
