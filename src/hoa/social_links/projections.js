import { imageProjection } from "../sanity_image/projections"

export const socialItemProjection = `{
  ...,

  socialNetwork -> {
    "icon": icon.asset ->  ${imageProjection},
    title,
  },
}`
