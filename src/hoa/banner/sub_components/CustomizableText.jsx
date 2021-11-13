import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"
import { StyledRichText } from "@hoa/hoa.ui.rich_text"

const DefaultStyles = styled.div`
  font-size: 1.0625rem;
  letter-spacing: -0.02em;
  line-height: 1.5;
  margin: 0 auto;
  text-align: center;
`

const PhoneContainer = styled(DefaultStyles)`
  @media (min-width: ${props => props.theme.tabletMin}) {
    display: none;
  }
`
const TabletContainer = styled(DefaultStyles)`
  @media (max-width: ${props => props.theme.phoneMax}) {
    display: none;
  }
`

export const CustomizableText = ({
  commonStyle: { code: commonStyleString },
  content,
  phoneStyle: { code: phoneStyleString },
  tabletStyle: { code: tabletStyleString },
}) => {
  const [phoneStyle, commonStyle, tabletStyle] = [
    phoneStyleString,
    commonStyleString,
    tabletStyleString,
  ].map(JSON.parse)

  return (
    <>
      <PhoneContainer style={{ ...commonStyle, ...phoneStyle }}>
        <StyledRichText blocks={content} />
      </PhoneContainer>

      <TabletContainer style={{ ...commonStyle, ...tabletStyle }}>
        <StyledRichText blocks={content} />
      </TabletContainer>
    </>
  )
}

CustomizableText.propTypes = {
  commonStyle: PropTypes.object.isRequired,
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  phoneStyle: PropTypes.object.isRequired,
  tabletStyle: PropTypes.object.isRequired,
}
