import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"
import { SocialLinks } from "@hoa/hoa.ui.social_links"

const Styled = styled.div`
  margin-top: 15px;
`

const SocialLinksSerializer = ({ node: { socialItems } }) => (
  <Styled>
    <SocialLinks items={socialItems} />
  </Styled>
)

SocialLinksSerializer.propTypes = {
  node: PropTypes.object.isRequired,
}

export default SocialLinksSerializer
