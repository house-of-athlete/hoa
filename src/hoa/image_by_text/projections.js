import { blockContentProjection } from "../rich_text/projections"
import { imageOrVideoProjection } from "../image_or_video/projections"
import { internalLinkProjection } from "../links/projections"
import { muxVideoProjection } from "../mux_video/projections"

export const imageByTextProjection = `{
  content[] ${blockContentProjection},

  "imageLink": imageLink[] {
    ...,

    _type == "internalLink" => {
      document -> ${internalLinkProjection},
    },

    _type == "videoModalLink" => {
      "video": video.asset -> ${muxVideoProjection},
    },
  }[0],

  imageOrVideo ${imageOrVideoProjection},
}`
