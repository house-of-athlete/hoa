import { blockContentProjection } from "@hoa/hoa.ui.rich_text"
import { imageOrVideoProjection } from "@hoa/hoa.ui.image_or_video"
import { internalLinkProjection } from "@hoa/hoa.ui.cms_link"

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
