import { blockContentProjection } from "@hoa/hoa.ui.rich_text"
import { internalLinkProjection } from "../links/projections"
import { muxVideoProjection } from "../mux_video"

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
