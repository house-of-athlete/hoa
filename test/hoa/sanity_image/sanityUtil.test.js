import { sanityImageUrl } from "../../../src/hoa/sanity_image/sanityUtil"

describe("sanityUtil", () => {
  test("sanityImageUrl", () => {
    expect(sanityImageUrl("https://cdn.sanity.io/images/cat.jpg")).toEqual(
      "https://cdn.sanity.io/images/cat.jpg?fit=min&w=800&auto=format"
    )

    expect(
      sanityImageUrl("https://cdn.sanity.io/images/cat.jpg", { w: 350 })
    ).toEqual("https://cdn.sanity.io/images/cat.jpg?fit=min&w=350&auto=format")

    expect(() => {
      sanityImageUrl("https://wrong.com/images/cat.jpg")
    }).toThrow("invalid Sanity CDN url: https://wrong.com/images/cat.jpg")

    expect(() => {
      sanityImageUrl()
    }).toThrow("URL is missing")
  })
})
