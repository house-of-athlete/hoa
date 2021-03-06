import { blockContentProjection } from "../rich_text/projections"
import { imageOrVideoProjection } from "../image_or_video/projections"
import { internalLinkProjection } from "../links/projections"

export const bannerProjection = `{
  backgroundLink[] {
    ...,
    document -> ${internalLinkProjection},
  }[0],

  content[] {
    ...,

    _type == "ButtonRow" => {
      buttons[] {
        ...,

        _type == "internalLinkButton" => {
          document -> ${internalLinkProjection},
        },
      },
    },

    _type == "CustomizableText" => {
      content[] ${blockContentProjection},
    },
  },

  imageOrVideo ${imageOrVideoProjection},
}`
