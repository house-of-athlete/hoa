import { imageProjection } from "../sanity_image/projections"
import { muxVideoProjection } from "../mux_video/projections"

export const imageOrVideoProjection = `{
  "image": image.asset -> ${imageProjection},
  "imagePhone": imagePhone.asset -> ${imageProjection},
  "video": video.asset -> ${muxVideoProjection},
  "videoPhone": videoPhone.asset -> ${muxVideoProjection},
}`
