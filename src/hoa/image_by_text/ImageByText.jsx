import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"
import { StyledRichText } from "../rich_text"
import { CMSLink } from "../links"
import { PlayButtonOverlay } from "../mux_video"
import { ImageOrVideo } from "../image_or_video"

const Styled = styled.div`
  display: grid;
  column-gap: 16px;
  row-gap: 24px;

  @media (min-width: 767px) {
    grid-template-areas: ${({ desktopLayout }) =>
      desktopLayout === "imageOnRight" ? `"content image"` : `"image content"`};

    grid-template-columns: 1fr 1fr;
  }
`

const Subtitle = styled.div`
  color: var(--color-brand-secondary);
  font-size: 0.875rem;
  margin-top: 8px;
  text-transform: uppercase;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 0 10px;
  }

  @media (min-width: 767px) {
    grid-area: content;
    padding: 0 40px;
  }
`

const ImageContainer = styled.div`
  position: relative;

  @media (min-width: 767px) {
    grid-area: image;
  }
`

const RichTextContainer = styled.div`
  margin-top: 15px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`

export const ImageByText = ({
  content,
  desktopLayout,
  imageLink,
  imageOrVideo,
  subtitle,
  title,
}) => (
  <Styled desktopLayout={desktopLayout}>
    <ImageContainer>
      <CMSLink isOptional link={imageLink}>
        <ImageOrVideo {...imageOrVideo} />
      </CMSLink>

      {imageLink?._type === "videoModalLink" && <PlayButtonOverlay />}
    </ImageContainer>

    <TextContainer>
      {title && <div className="hoa-title">{title}</div>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}

      <RichTextContainer>
        <StyledRichText blocks={content} />
      </RichTextContainer>
    </TextContainer>
  </Styled>
)

ImageByText.propTypes = {
  content: PropTypes.array.isRequired,
  desktopLayout: PropTypes.string.isRequired,
  imageLink: PropTypes.object,
  imageOrVideo: PropTypes.object.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string,
}
