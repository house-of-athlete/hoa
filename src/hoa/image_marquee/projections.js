import { internalLinkProjection } from "../links/projections"
import { imageProjection } from "../sanity_image/projections"

export const imageMarqueeProjection = `{
  items[] {
    ...,

    "image": image.asset -> ${imageProjection},

    link[] {
      ...,

      _type == "internalLink" => {
        document -> ${internalLinkProjection},
      },
    }[0],
  }
}`
