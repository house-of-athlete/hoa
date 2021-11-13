import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"
import { ExternalLink } from "../links"
import { FullWidthSanityImage } from "../sanity_image"

const Styled = styled.div`
  column-gap: 26px;
  display: grid;
  grid-auto-columns: 26px;
  grid-auto-flow: column;
`

export const SocialLinks = ({ items }) => {
  return (
    <Styled>
      {items.map(({ _key, socialNetwork: { icon, title }, url }) => (
        <ExternalLink key={_key} href={url}>
          <FullWidthSanityImage image={icon} title={title} alt={title} />
        </ExternalLink>
      ))}
    </Styled>
  )
}

SocialLinks.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}
