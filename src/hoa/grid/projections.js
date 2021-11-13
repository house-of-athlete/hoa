import { imageProjection } from "@hoa/hoa.ui.sanity_image"
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
