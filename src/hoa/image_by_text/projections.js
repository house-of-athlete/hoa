import { blockContentProjection } from "../rich_text/projections"
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
}`
