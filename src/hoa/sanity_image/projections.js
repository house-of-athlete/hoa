export const imageProjection = `{
  _id,
  _type,
  metadata {
    dimensions,
    palette {
      dominant
    },
  },
  url,
}`.replace(/\n/g, "")
