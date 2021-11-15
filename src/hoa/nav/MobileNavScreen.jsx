import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"
import { EventLink } from "../../vendor/hoa/links"
import { ChevronRight, ChevronLeft } from "../../vendor/hoa/icons"
import { SocialLinks } from "../../vendor/hoa/social_links"
import { CMSLink } from "../../vendor/hoa/links/CMSLink"

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

export default MobileNavScreen
