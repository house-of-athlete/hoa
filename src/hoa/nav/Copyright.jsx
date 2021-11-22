import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"
import { CMSLink } from "../links"

const Styled = styled.div`
  color: var(--color-dark-gray);
  font-size: 0.8125rem;
  line-height: 2;

  @media (max-width: ${props => props.theme.phoneMax}) {
    margin-top: 30px;
    padding: 0 var(--hoa-mobile-nav-side-padding);

    > a:not(:first-of-type)::before {
      content: " | ";
      padding: 0 10px;
    }
  }

  @media (min-width: ${props => props.theme.tabletMin}) {
    margin-top: 40px;

    > a::before {
      content: " | ";
      padding: 0 20px;
    }
  }
`

const CopyrightMessage = styled.span`
  @media (max-width: ${props => props.theme.phoneMax}) {
    display: block;
  }
`

export const Copyright = ({ items, message }) => (
  <Styled>
    <CopyrightMessage>{message}</CopyrightMessage>

    {items.map(item => (
      <CMSLink key={item._key} link={item}>
        {item.name}
      </CMSLink>
    ))}
  </Styled>
)

Copyright.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  message: PropTypes.string.isRequired,
}
