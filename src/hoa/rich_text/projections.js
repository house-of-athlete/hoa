import { internalLinkProjection } from "../links/projections"
import { muxVideoProjection } from "../mux_video/projections"
import { socialItemProjection } from "../social_links/projections"

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
