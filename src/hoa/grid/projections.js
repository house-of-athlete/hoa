import { imageProjection } from "../sanity_image/projections"
import { internalLinkProjection } from "../links/projections"

export const gridProjection = `{
  items[] {
    ...,
    "image": image.asset -> ${imageProjection},
    "link": link[] {
      ...,
      _type == "internalLink" => {
        document -> ${internalLinkProjection},
      }
    }[0],
  },
}`
