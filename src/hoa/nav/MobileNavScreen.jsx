import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { ExternalLink, EventLink } from "../../vendor/hoa/links"
import internalLinkPath from "../../lib/internalLinkPath"
import chevronRight from "../../images/chevron-right.svg"
import chevronLeft from "../../images/chevron-left.svg"
import { convertNavItem } from "../../lib/navigation"
import { SocialLinks } from "../../vendor/hoa/social_links"

const StyledItem = styled.a`
  align-items: center;
  border-bottom: var(--mobile-nav-border);
  display: flex;
  height: var(--mobile-nav-item-height);
  justify-content: space-between;
  padding: 0 var(--mobile-nav-side-padding);
`

const NestedItem = ({ item, onNavigate }) => (
  <StyledItem
    as={EventLink}
    onClick={() => {
      onNavigate(item)
    }}
  >
    {item.name}
    <img src={chevronRight} alt="" />
  </StyledItem>
)

NestedItem.propTypes = {
  item: PropTypes.object.isRequired,
  onNavigate: PropTypes.func.isRequired,
}

const renderItem = (item, { onNavigate }) => {
  const { _key, _type, name } = item

  switch (_type) {
    case "externalLinkNavItem":
      return (
        <StyledItem key={_key} as={ExternalLink} href={item.url}>
          {name}
        </StyledItem>
      )

    case "internalLinkNavItem":
      return (
        <StyledItem key={_key} as={Link} to={internalLinkPath(item.document)}>
          {name}
        </StyledItem>
      )

    case "nestedNavItem":
      return <NestedItem key={_key} item={item} onNavigate={onNavigate} />

    default:
      throw new Error(`unknown mobile nav type: ${_type}`)
  }
}

const Styled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
`

const BackNav = styled(EventLink)`
  align-items: center;
  border-bottom: var(--mobile-nav-border);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  height: var(--mobile-nav-item-height);
  font-weight: var(--weight-bold);
  padding: 0 var(--mobile-nav-side-padding);
`

const SocialLinksContainer = styled.div`
  color: #c4c4c4;
  display: grid;
  font-size: 1rem;
  font-weight: var(--weight-slight-bold);
  padding: 20px var(--mobile-nav-side-padding) 35px;
  row-gap: 15px;

  ${Styled}:not(:first-of-type) & {
    display: none;
  }
`

const MobileNavScreen = ({
  navigation,
  onNavigate,
  onNavigateBack,
  socialItems,
}) => (
  <Styled>
    <div>
      {navigation.name ? (
        <BackNav onClick={onNavigateBack}>
          <img src={chevronLeft} alt="" />
          <div>{navigation.name}</div>
          <div></div>
        </BackNav>
      ) : null}

      {navigation.items
        .map(convertNavItem)
        .map(item => renderItem(item, { onNavigate }))}
    </div>

    <SocialLinksContainer>
      Follow Us
      <SocialLinks items={socialItems} />
    </SocialLinksContainer>
  </Styled>
)

MobileNavScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onNavigateBack: PropTypes.func.isRequired,
  socialItems: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default MobileNavScreen
