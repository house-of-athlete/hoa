import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"
import { EventLink, CMSLink } from "../links"
import { ChevronRight, ChevronLeft } from "../icons"
import { SocialLinks } from "../social_links"

const StyledItem = styled.a`
  align-items: center;
  border-bottom: var(--hoa-mobile-nav-border);
  display: flex;
  height: var(--hoa-mobile-nav-item-height);
  justify-content: space-between;
  padding: 0 var(--hoa-mobile-nav-side-padding);
`

const NestedItem = ({ item, onNavigate }) => (
  <StyledItem
    as={EventLink}
    onClick={() => {
      onNavigate(item)
    }}
  >
    {item.name}

    <ChevronRight />
  </StyledItem>
)

NestedItem.propTypes = {
  item: PropTypes.object.isRequired,
  onNavigate: PropTypes.func.isRequired,
}

const renderItem = (item, { onNavigate }) => {
  const { _key, _type, name } = item

  switch (_type) {
    case "nestedNavItem":
      return <NestedItem key={_key} item={item} onNavigate={onNavigate} />

    default:
      return (
        <StyledItem key={_key} as={CMSLink} link={item}>
          {name}
        </StyledItem>
      )
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
  border-bottom: var(--hoa-mobile-nav-border);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  height: var(--hoa-mobile-nav-item-height);
  font-weight: var(--weight-bold);
  padding: 0 var(--hoa-mobile-nav-side-padding);
`

const SocialLinksContainer = styled.div`
  color: #c4c4c4;
  display: grid;
  font-size: 1rem;
  font-weight: var(--weight-slight-bold);
  padding: 20px var(--hoa-mobile-nav-side-padding) 35px;
  row-gap: 15px;

  ${Styled}:not(:first-of-type) & {
    display: none;
  }
`

export const MobileNavScreen = ({
  convertNavItem = i => i,
  navigation,
  onNavigate,
  onNavigateBack,
  socialItems,
}) => (
  <Styled>
    <div>
      {navigation.name ? (
        <BackNav onClick={onNavigateBack}>
          <ChevronLeft />
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
  convertNavItem: PropTypes.func,
  navigation: PropTypes.object.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onNavigateBack: PropTypes.func.isRequired,
  socialItems: PropTypes.arrayOf(PropTypes.object).isRequired,
}
