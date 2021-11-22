import PropTypes from "prop-types"
import React, { useContext, useState } from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { convertNavItem } from "../lib/navigation"
import CMSContext from "./context/CMSContext"
import { ExternalLink, CMSLink } from "../vendor/hoa/links"
import internalLinkPath from "../lib/internalLinkPath"
import { MOBILE_NAV_MAX, DESKTOP_NAV_MIN } from "./CSSVariables"
import Copyright from "./Copyright"
import { ChevronDown, ChevronUp } from "../vendor/hoa/icons"

const mobileFooterMQ = `(max-width: ${MOBILE_NAV_MAX}px)`
const desktopFooterMQ = `(min-width: ${DESKTOP_NAV_MIN}px)`

const StyledSubItem = styled.a`
  display: block;

  &,
  &:visited,
  &:hover,
  &:active {
    // FIXME CSS var
    color: var(--color-dark-gray);
  }
`

const ItemsContainer = styled.div`
  display: grid;

  @media ${mobileFooterMQ} {
    row-gap: 17px;
  }

  @media ${desktopFooterMQ} {
    row-gap: 12px;
  }
`

const IndentedItemsContainer = styled(ItemsContainer)`
  padding-left: 15px;
`

const renderSubItem = item => {
  const { _key, _type, name } = item

  switch (_type) {
    case "navigationDivider":
      return <div key={item._key}>&nbsp;</div>

    case "externalLinkNavItem":
      return (
        <StyledSubItem key={_key} as={ExternalLink} href={item.url}>
          {name}
        </StyledSubItem>
      )

    case "internalLinkNavItem":
      return (
        <StyledSubItem
          key={_key}
          as={Link}
          to={internalLinkPath(item.document)}
        >
          {name}
        </StyledSubItem>
      )

    case "footerNestedNavItem":
      return (
        <ItemsContainer key={_key}>
          <CMSLink link={item.headingLink} isOptional>
            {props => <StyledSubItem {...props}>{item.name}</StyledSubItem>}
          </CMSLink>

          <IndentedItemsContainer>
            {item.items.map(renderSubItem)}
          </IndentedItemsContainer>
        </ItemsContainer>
      )

    default:
      throw new Error(`unknown mobile nav type: ${_type}`)
  }
}

const StyledTopLevelHeading = styled.span`
  text-transform: uppercase;

  @media ${mobileFooterMQ} {
    align-items: center;
    display: flex;
    height: var(--hoa-mobile-nav-item-height);
    font-size: 1.0625rem;
    justify-content: space-between;
    padding: 0 var(--hoa-mobile-nav-side-padding);
  }

  @media ${desktopFooterMQ} {
    display: block;
    font-weight: bold;
    margin-bottom: 15px;
  }
`

const HeadingImg = styled.div`
  width: 18px;

  @media ${desktopFooterMQ} {
    display: none;
  }
`

const StyledTopLevelItem = styled.div`
  @media ${mobileFooterMQ} {
    border-bottom: var(--hoa-mobile-nav-border);

    &:first-of-type {
      border-top: var(--hoa-mobile-nav-border);
    }
  }
`

const TopLevelItemsContainer = styled(ItemsContainer)`
  @media ${mobileFooterMQ} {
    display: ${({ $isCollapsed }) => ($isCollapsed ? "none" : "grid")};
    margin: 0 0 20px 35px;
  }
`

const TopLevelItem = ({ headingLink, items, name }) => {
  const [isExpanded, setExpanded] = useState(false)

  const onHeadingClick = event => {
    if (window.matchMedia(mobileFooterMQ).matches) {
      event.preventDefault()
      setExpanded(b => !b)
    }
  }

  return (
    <StyledTopLevelItem>
      <CMSLink link={headingLink} isOptional onClick={onHeadingClick}>
        {({ ...props }) => (
          <StyledTopLevelHeading {...props}>
            {name}
            <HeadingImg as={isExpanded ? ChevronUp : ChevronDown} />
          </StyledTopLevelHeading>
        )}
      </CMSLink>

      <TopLevelItemsContainer $isCollapsed={!isExpanded}>
        {items.map(renderSubItem)}
      </TopLevelItemsContainer>
    </StyledTopLevelItem>
  )
}

TopLevelItem.propTypes = {
  headingLink: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
}

const Styled = styled.footer`
  font-size: 0.8125rem;

  @media (max-width: ${props => props.theme.phoneMax}) {
    margin: 35px auto 30px;
  }

  @media (min-width: ${props => props.theme.tabletMin}) {
    margin: 45px auto 50px;
    max-width: 1280px;
    padding: 0 80px;
  }
`

const FooterItems = styled.div`
  @media ${desktopFooterMQ} {
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
  }
`

export const FooterNav = () => {
  const {
    navigation: { footerItems, legalItems },
  } = useContext(CMSContext)

  return (
    <Styled>
      <FooterItems>
        {footerItems
          .map(item => convertNavItem(item, { type: "footerNestedNavItem" }))
          .map(item => (
            <TopLevelItem key={item._key} {...item} />
          ))}
      </FooterItems>

      <Copyright items={legalItems} />
    </Styled>
  )
}

FooterNav.propTypes = {}
