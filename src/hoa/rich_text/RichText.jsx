import BlockContent from "@sanity/block-content-to-react"
import PropTypes from "prop-types"
import React, { createContext, useContext } from "react"
import styled from "@emotion/styled"
import { InternalLinkSerializer } from "./serializers/InternalLinkSerializer"
import { LinkSerializer } from "./serializers/LinkSerializer"
import { SmallSerializer } from "./serializers/SmallSerializer"
import { SocialLinksSerializer } from "./serializers/SocialLinksSerializer"
import { VideoModalSerializer } from "./serializers/VideoModalSerializer"
import { createBlockRenderer } from "./serializers/createBlockRenderer"

const RichTextConfigContext = createContext()

export const RichTextConfigProvider = ({ children, sanityConfig }) => (
  <RichTextConfigContext.Provider value={sanityConfig}>
    {children}
  </RichTextConfigContext.Provider>
)

RichTextConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
  sanityConfig: PropTypes.object.isRequired,
}

export const RichText = ({ blocks, blockStyleRenderers, className }) => {
  const sanityConfig = useContext(RichTextConfigContext)

  const serializers = {
    marks: {
      internalLink: InternalLinkSerializer,
      link: LinkSerializer,
      videoModal: VideoModalSerializer,
      small: SmallSerializer,
    },
    types: {
      block: createBlockRenderer(blockStyleRenderers),
      blockContentSocialLinks: SocialLinksSerializer,
    },
  }

  return (
    <BlockContent
      blocks={blocks}
      className={className}
      ignoreUnknownTypes={false}
      projectId={sanityConfig.projectId}
      dataset={sanityConfig.dataset}
      serializers={serializers}
    />
  )
}

RichText.propTypes = {
  blocks: PropTypes.array.isRequired,
  blockStyleRenderers: PropTypes.object,
  className: PropTypes.string,
}

const Styled = styled.div`
  line-height: 1.5;

  a {
    text-decoration: underline;
  }

  p,
  ul,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul {
    margin: 14px 0;
  }

  p,
  ol,
  ul {
    font-size: var(--hoa-rich-text-paragraph-font-size);
  }

  ol,
  ul {
    padding-left: 40px;
  }

  ol li {
    list-style-type: decimal;
  }

  ul li {
    list-style-type: disc;
  }

  p:first-of-type,
  ul:first-of-type {
    margin-top: 0;
  }
  p:last-of-type,
  ul:last-of-type {
    margin-bottom: 0;
  }
`

export const StyledRichText = ({ className, ...props }) => (
  <Styled className={className}>
    <RichText {...props} />
  </Styled>
)

StyledRichText.propTypes = {
  className: PropTypes.string,
}
