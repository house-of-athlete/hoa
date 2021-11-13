import { internalLinkProjection } from "../links/projections"
import { muxVideoProjection } from "../mux_video/projections"
import { socialItemProjection } from "@hoa/hoa.ui.social_links"

export const blockContentProjection = `{
  ...,

  markDefs[] {
    ...,

    _type == "internalLink" => {
      doc -> ${internalLinkProjection},
    },

    _type == "videoModal" => {
      "video": video.asset -> ${muxVideoProjection},
    },
  },

  _type == "blockContentSocialLinks" => {
    socialItems[] ${socialItemProjection},
  },
}`
