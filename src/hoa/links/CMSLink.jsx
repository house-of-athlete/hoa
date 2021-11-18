import PropTypes from "prop-types"
import React, { createContext, useContext } from "react"
import { EventLink } from "./EventLink"
import { ExternalLink } from "./ExternalLink"
import { VideoModalLink } from "../video_modal"
import { isFunction, pick } from "lodash"

const CMSLinkConfigContext = createContext()

export const CMSLinkConfigProvider = ({ children, ...props }) => {
  const existingConfig = useContext(CMSLinkConfigContext) || {}

  const config = {
    ...existingConfig,
    ...pick(props, ["getInternalLink", "performAction"]),
  }

  if (
    !isFunction(config.getInternalLink) ||
    !isFunction(config.performAction)
  ) {
    throw new Error(
      `CMSLink is missing configuration; see https://github.com/house-of-athlete/hoa`
    )
  }

  return (
    <CMSLinkConfigContext.Provider value={config}>
      {children}
    </CMSLinkConfigContext.Provider>
  )
}

CMSLinkConfigProvider.propTypes = {
  children: PropTypes.node,
  getInternalLink: PropTypes.func,
  performAction: PropTypes.func,
}

const getComponentAndProps = (link, { getInternalLink, performAction }) => {
  switch (link?._type) {
    case "actionLink":
    case "actionButton":
      return [
        EventLink,
        {
          onClick: () => {
            performAction(link.action)
          },
        },
      ]

    case "externalLink":
    case "externalLinkButton":
    case "externalLinkNavItem":
      return [ExternalLink, { href: link.url }]

    case "internalLink":
    case "internalLinkButton":
    case "internalLinkNavItem":
      return getInternalLink(link.document)

    case "videoModalLink":
      return [VideoModalLink, { video: link.video }]

    default:
      throw new Error(`unknown link object: ${JSON.stringify(link)}`)
  }
}

/**
 * Dynamically renders either an internal link or external link depending on the `_type` field
 * from Sanity.
 */
export const CMSLink = ({ children, link, isOptional, ...props }) => {
  const config = useContext(CMSLinkConfigContext)

  props = pick(props, ["className", "onClick"])

  if (isFunction(children)) {
    if (!link && isOptional) {
      return children({ ...props, as: "span" })
    } else {
      const [LinkComponent, componentProps] = getComponentAndProps(link, config)

      return children({ ...props, ...componentProps, as: LinkComponent })
    }
  } else {
    if (!link && isOptional) {
      return <span {...props}>{children}</span>
    } else {
      const [LinkComponent, componentProps] = getComponentAndProps(link, config)

      return (
        <LinkComponent {...props} {...componentProps}>
          {children}
        </LinkComponent>
      )
    }
  }
}

CMSLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  className: PropTypes.string,
  link: PropTypes.object,
  isOptional: PropTypes.bool,
  onClick: PropTypes.func,
}
