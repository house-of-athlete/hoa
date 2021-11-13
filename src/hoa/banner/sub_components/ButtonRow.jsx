import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"
import { CMSLink } from "@hoa/hoa.ui.cms_link"
import classNames from "classnames"
import { kebabCase } from "lodash"

const Styled = styled.div`
  column-gap: 16px;
  display: grid;
  grid-auto-columns: minmax(185px, auto);
  justify-content: center;
  row-gap: 10px;

  @media (max-width: ${props => props.theme.phoneMax}) {
    grid-auto-flow: ${({ gridAutoFlowPhone }) => gridAutoFlowPhone};
  }

  @media (max-width: 413px) {
    grid-auto-flow: row;
  }

  @media (min-width: ${props => props.theme.tabletMin}) {
    grid-auto-flow: column;
  }
`

export const ButtonRow = ({ buttons, gridAutoFlowPhone }) => (
  <Styled gridAutoFlowPhone={gridAutoFlowPhone}>
    {buttons.map(button => (
      <CMSLink
        key={button._key}
        className={classNames("hoa-button", {
          [`hoa-button--${kebabCase(button.theme)}`]: button.theme,
        })}
        link={button}
      >
        {button.text}
      </CMSLink>
    ))}
  </Styled>
)

ButtonRow.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  gridAutoFlowPhone: PropTypes.string.isRequired,
}
