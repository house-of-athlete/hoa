import { blockContentProjection } from "@hoa/hoa.ui.rich_text"
import { internalLinkProjection } from "@hoa/hoa.ui.cms_link"
import { muxVideoProjection } from "@hoa/hoa.ui.mux_video"

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
