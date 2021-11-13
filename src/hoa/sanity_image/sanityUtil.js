const toQueryString = params => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value)
  })

  return searchParams.toString()
}

export const sanityImageUrl = (baseUrl, opts = {}) => {
  if (!baseUrl) {
    throw new Error("URL is missing")
  }

  if (!baseUrl.startsWith("https://cdn.sanity.io/")) {
    throw new Error(`invalid Sanity CDN url: ${baseUrl}`)
  }

  const query = toQueryString({ fit: "min", w: 800, ...opts, auto: "format" })

  return `${baseUrl}?${query}`
}
