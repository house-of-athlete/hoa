import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"
import { MuxVideo } from "@hoa/hoa.ui.mux_video"
import { SanityImage } from "@hoa/hoa.ui.sanity_image"
import { isEqual } from "lodash"

const phoneMQ = `(max-width: 767px)`
const tabletMQ = `(min-width: 768px)` // Tailwind "md"

const isVideo = item => item && item._type === "mux.videoAsset"

const getAspectRatio = item => {
  switch (item._type) {
    case "sanity.imageAsset":
      return item.metadata.dimensions.aspectRatio

    case "mux.videoAsset": {
      const [w, h] = item.data.aspect_ratio.split(":").map(Number)
      return w / h
    }

    default:
      throw new Error(`unknown item type: ${item._type}`)
  }
}

const getVideoProp = ({ phoneItem, tabletItem }) => {
  if (!isVideo(phoneItem) && !isVideo(tabletItem)) {
    return
  }

  if (isEqual(phoneItem, tabletItem)) {
    return phoneItem
  }

  return [
    { video: phoneItem, media: phoneMQ },
    { video: tabletItem, media: tabletMQ },
  ].filter(i => isVideo(i.video))
}

const Styled = styled.div`
  position: relative;

  > img,
  > video {
    left: 0;
    object-fit: cover;
    position: absolute;
    top: 0;
    width: 100%;
  }

  @media ${phoneMQ} {
    padding-bottom: ${({ phoneAR }) => 100 / phoneAR}%;
  }

  @media ${tabletMQ} {
    padding-bottom: ${({ tabletAR }) => 100 / tabletAR}%;
  }
`

const PhoneSanityImage = styled(SanityImage)`
  display: block;

  @media ${tabletMQ} {
    display: none;
  }
`

const TabletSanityImage = styled(SanityImage)`
  display: block;

  @media ${phoneMQ} {
    display: none;
  }
`

export const ImageOrVideo = ({
  fullHeight,
  image,
  imagePhone,
  video,
  videoPhone,
}) => {
  const heightClass = fullHeight ? "h-full" : "h-auto"

  const tabletItem = video || image
  const phoneItem = videoPhone || imagePhone || tabletItem

  const videoProp = getVideoProp({ phoneItem, tabletItem })

  return (
    <Styled
      className={heightClass}
      phoneAR={getAspectRatio(phoneItem)}
      tabletAR={getAspectRatio(tabletItem)}
    >
      {videoProp && (
        <MuxVideo
          className={heightClass}
          autoPlay
          muted
          loop
          playsInline
          video={videoProp}
        />
      )}

      {/* both phone and tablet images downloaded; could be optimized with <picture> element */}
      {phoneItem._type === "sanity.imageAsset" && (
        <PhoneSanityImage className={heightClass} image={phoneItem} />
      )}

      {tabletItem._type === "sanity.imageAsset" && (
        <TabletSanityImage className={heightClass} image={tabletItem} />
      )}
    </Styled>
  )
}

ImageOrVideo.propTypes = {
  fullHeight: PropTypes.bool,
  image: PropTypes.object,
  imagePhone: PropTypes.object,
  video: PropTypes.object,
  videoPhone: PropTypes.object,
}
